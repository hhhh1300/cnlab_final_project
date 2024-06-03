CREATE TABLE IF NOT EXISTS MEMBER (
    member_id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(256) NOT NULL,
    member_role VARCHAR(11) NOT NULL CHECK (member_role IN ('Admin', 'User')) DEFAULT 'User',
    traffic INT NOT NULL DEFAULT 0,
    max_traffic INT NOT NULL DEFAULT 0
);
/
CREATE TABLE IF NOT EXISTS ACTIVITY (
    activity_id VARCHAR(100) PRIMARY KEY,
    hoster_id VARCHAR(100) NOT NULL,
    title VARCHAR(50) NOT NULL,
    activity_content VARCHAR(500) NOT NULL,
    applying_reason VARCHAR(500) NOT NULL,
    event_start_timestamp timestamp NOT NULL,
    event_end_timestamp timestamp NOT NULL,
    register_start_timestamp timestamp NOT NULL,
    register_end_timestamp timestamp NOT NULL,
    location VARCHAR(500) NOT NULL,
    status CHAR(15) NOT NULL CHECK (status IN ('passed','cancelled', 'reviewing')) DEFAULT 'reviewing',
    traffic_capacity INT NOT NULL DEFAULT 0,
    member_capacity INT NOT NULL DEFAULT 0,
    activity_tag VARCHAR(30) NOT NULL,
    activity_type CHAR(15) NOT NULL CHECK (activity_type IN ('non-official','official')) DEFAULT 'non-official',
    FOREIGN KEY (hoster_id) REFERENCES MEMBER(member_id) ON DELETE CASCADE ON UPDATE CASCADE
);
/
CREATE TABLE IF NOT EXISTS MEMBER_JOIN_ACTIVITY (
    activity_id VARCHAR(100),
    member_id VARCHAR(100),
    join_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (activity_id, member_id, join_timestamp),
    FOREIGN KEY (activity_id) REFERENCES ACTIVITY(activity_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (member_id) REFERENCES MEMBER(member_id) ON DELETE CASCADE ON UPDATE CASCADE
);
/
CREATE TABLE IF NOT EXISTS MESSAGE (
    message_id VARCHAR(100) PRIMARY KEY,
    activity_id VARCHAR(100) NOT NULL,
    member_id VARCHAR(100) NOT NULL,
    message_content VARCHAR(500) NOT NULL,
    message_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (activity_id) REFERENCES ACTIVITY(activity_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (member_id) REFERENCES MEMBER(member_id) ON DELETE CASCADE ON UPDATE CASCADE
);
/
CREATE TABLE IF NOT EXISTS ACTIVITY_ROLE (
    activity_id VARCHAR(100),
    member_id VARCHAR(100),
    activity_role CHAR(15) NOT NULL CHECK (activity_role IN ('hoster', 'participant')),
    PRIMARY KEY (activity_id, member_id),
    FOREIGN KEY (activity_id) REFERENCES ACTIVITY(activity_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (member_id) REFERENCES MEMBER(member_id) ON DELETE CASCADE ON UPDATE CASCADE
)