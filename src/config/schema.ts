import { UserProfile } from "@clerk/nextjs";
import { subscribe } from "diagnostics_channel";
import {
  boolean,
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const courseList = pgTable("courseList", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  name: varchar("name").notNull(),
  level: varchar("level").notNull(),
  includeVideo: varchar("includeVideo").notNull().default("yes"),
  category: varchar("category").notNull(),
  courseOutput: json("courseOutput").notNull(),
  createdBy: varchar("createdBy").notNull(),
  userName: varchar("userName"),
  UserProfileImage: varchar("UserProfileImage"),
  courseBanner: varchar("courseBanner"),
  price: integer("price").default(0).notNull(),
  publish: boolean("boolean").default(false),
  purchases: json("purchases").notNull().default("[]"), // Array of user IDs who purchased the course
});

export const CourseChapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  chapterId: varchar("chapterId").notNull(),
  content: json("content").notNull(),
  videoId: varchar("videoId").notNull(),
});

export const BlogPost = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  author: varchar("author").notNull(),
  category: varchar("category").notNull(),
  createdBy: varchar("createdBy").notNull(),
  postedOn: timestamp("postedOn").defaultNow(),
  tags: varchar("tags").array().notNull(),
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  coverImageUrl: varchar("coverImageUrl").notNull(),
  viewUserIds: varchar("viewUserIds").array().default([]), // Array of user IDs who have viewed the blog
  likeUserIds: varchar("likeUserIds").array().default([]), // Array of user IDs who have liked the blog
});

export const BlogComment = pgTable("blogComments", {
  id: serial("id").primaryKey(),
  postId: integer("postId")
    .notNull()
    .references(() => BlogPost.id),
  commenterName: varchar("commenterName").notNull(),
  comment: text("comment").notNull(),
  commentedOn: timestamp("commentedOn").defaultNow(),
  imageUrl: varchar("imageUrl").notNull(),
  commentedBy: varchar("commentedBy").notNull(),
});
