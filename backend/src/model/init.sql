CREATE TABLE IF NOT EXISTS MEMBER (
    Member_id VARCHAR(100) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Password VARCHAR(256) NOT NULL,
    Member_role VARCHAR(11) NOT NULL CHECK (Member_role IN ('Admin', 'User')) DEFAULT 'User',
    Traffic INT NOT NULL DEFAULT 0
);
/
CREATE TABLE IF NOT EXISTS ACTIVITY (
    Activity_id VARCHAR(100) PRIMARY KEY,
    Hoster_id VARCHAR(100) NOT NULL,
    Title VARCHAR(50) NOT NULL,
    Activity_content VARCHAR(500) NOT NULL,
    Applying_reason VARCHAR(500) NOT NULL,
    Event_start_timestamp timestamp NOT NULL,
    Event_end_timestamp timestamp NOT NULL,
    Register_start_timestamp timestamp NOT NULL,
    Register_end_timestamp timestamp NOT NULL,
    Location VARCHAR(500) NOT NULL,
    Status CHAR(15) NOT NULL CHECK (Status IN ('passed','cancelled', 'reviewing')) DEFAULT 'reviewing',
    Traffic_capacity INT NOT NULL DEFAULT 0,
    Member_capacity INT NOT NULL DEFAULT 0,
    Activity_tag VARCHAR(30) NOT NULL,
    Activity_type CHAR(15) NOT NULL CHECK (Activity_type IN ('non-official','official')) DEFAULT 'non-official',
    FOREIGN KEY (Hoster_id) REFERENCES MEMBER(Member_id) ON DELETE CASCADE ON UPDATE CASCADE
);
/
CREATE TABLE IF NOT EXISTS MEMBER_JOIN_ACTIVITY (
    Activity_id VARCHAR(100),
    Member_id VARCHAR(100),
    Join_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Activity_id, Member_id, Join_timestamp),
    FOREIGN KEY (Activity_id) REFERENCES ACTIVITY(Activity_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Member_id) REFERENCES MEMBER(Member_id) ON DELETE CASCADE ON UPDATE CASCADE
);
/
CREATE TABLE IF NOT EXISTS MESSAGE (
    Message_id VARCHAR(100) PRIMARY KEY,
    Activity_id VARCHAR(100) NOT NULL,
    Member_id VARCHAR(100) NOT NULL,
    Message_content VARCHAR(500) NOT NULL,
    Message_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Activity_id) REFERENCES ACTIVITY(Activity_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Member_id) REFERENCES MEMBER(Member_id) ON DELETE CASCADE ON UPDATE CASCADE
);
/
CREATE TABLE IF NOT EXISTS ACTIVITY_ROLE (
    Activity_id VARCHAR(100),
    Member_id VARCHAR(100),
    Activity_role CHAR(15) NOT NULL CHECK (Activity_role IN ('hoster', 'participant')),
    PRIMARY KEY (Activity_id, Member_id),
    FOREIGN KEY (Activity_id) REFERENCES ACTIVITY(Activity_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Member_id) REFERENCES MEMBER(Member_id) ON DELETE CASCADE ON UPDATE CASCADE
)