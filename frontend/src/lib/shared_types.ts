import { z } from 'zod';

const ActivityDataSchema = z.object({
  activity_id: z.string(),
  title: z.string(),
  activity_tag: z.string(),
  description: z.string(),
  event_start_timestamp: z.date(),
  event_end_timestamp: z.date(),
  location: z.string(),
  member_capacity: z.number().int(),
  traffic_capacity: z.number().int(),
  status: z.enum(['under_review', 'approved', 'rejected']),
  register_start_timestamp: z.date(),
  register_end_timestamp: z.date(),
  hoster_id: z.string(),
  hoster_name: z.string(),
  is_official: z.boolean(),
});

const MessageDataSchema = z.object({
  message_id: z.string(),
  chatgroup_id: z.string(),
  member_id: z.string(),
  message_time: z.date(),
  message_text: z.string(),
});

export type ActivityData = z.infer<typeof ActivityDataSchema>;

export type MessageData = z.infer<typeof MessageDataSchema>;
