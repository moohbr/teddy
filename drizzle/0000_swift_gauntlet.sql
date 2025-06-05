CREATE TABLE "urls" (
	"short_id" varchar(6) PRIMARY KEY NOT NULL,
	"original_url" varchar(2048) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "urls_original_url_unique" UNIQUE("original_url")
);
