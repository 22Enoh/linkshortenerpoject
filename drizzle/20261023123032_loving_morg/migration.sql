CREATE TABLE "links" (
	"id" serial PRIMARY KEY,
	"user_id" text NOT NULL,
	"short_code" text NOT NULL UNIQUE,
	"url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "links_user_id_idx" ON "links" ("user_id");