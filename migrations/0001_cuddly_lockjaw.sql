CREATE TABLE `championships` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`nr` integer NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`extra_points_published` integer DEFAULT false NOT NULL,
	`ruleset_id` integer NOT NULL,
	FOREIGN KEY (`ruleset_id`) REFERENCES `rulesets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `rulesets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`extra_question_rule` text NOT NULL,
	`match_rule` text NOT NULL,
	`round_rule` text NOT NULL,
	`tip_rule` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `championships_slug_unique` ON `championships` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `rulesets_slug_unique` ON `rulesets` (`slug`);