PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_blogs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`content` text NOT NULL,
	`date` text NOT NULL,
	`title` text DEFAULT 'Some dummy title' NOT NULL,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_blogs`("id", "key", "content", "date", "title", "user_id") SELECT "id", "key", "content", "date", "title", "user_id" FROM `blogs`;--> statement-breakpoint
DROP TABLE `blogs`;--> statement-breakpoint
ALTER TABLE `__new_blogs` RENAME TO `blogs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `blogs_key_unique` ON `blogs` (`key`);