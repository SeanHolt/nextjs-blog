ALTER TABLE `blogs` ADD `key` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `blogs_key_unique` ON `blogs` (`key`);