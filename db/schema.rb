# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150412161451) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.string   "comment",    null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "contacts", force: true do |t|
    t.string   "fname",      null: false
    t.string   "lname",      null: false
    t.string   "email",      null: false
    t.string   "reason",     null: false
    t.string   "message",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "data_files", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ideas", force: true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.string   "cover_img_file_name"
    t.string   "cover_img_content_type"
    t.integer  "cover_img_file_size"
    t.datetime "cover_img_updated_at"
  end

  add_index "ideas", ["user_id"], name: "index_ideas_on_user_id", using: :btree

  create_table "participations", force: true do |t|
    t.integer  "idea_id"
    t.integer  "user_id"
    t.boolean  "owner"
    t.boolean  "admin"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pull_requests", force: true do |t|
    t.integer "repository_id",                       null: false
    t.string  "message",                             null: false
    t.integer "to_repo_id"
    t.string  "status",        default: "SUBMITTED", null: false
  end

  add_index "pull_requests", ["repository_id"], name: "index_pull_requests_on_repository_id", using: :btree
  add_index "pull_requests", ["to_repo_id"], name: "index_pull_requests_on_to_repo_id", using: :btree

  create_table "repositories", force: true do |t|
    t.integer "idea_id",         null: false
    t.boolean "pull_request_id"
    t.string  "path"
    t.integer "user_id"
  end

  add_index "repositories", ["idea_id"], name: "index_repositories_on_idea_id", using: :btree
  add_index "repositories", ["user_id"], name: "index_repositories_on_user_id", using: :btree

  create_table "repository_comments", force: true do |t|
    t.integer  "repository_id"
    t.integer  "comment_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "repository_comments", ["repository_id", "comment_id"], name: "index_repository_comments_on_repository_id_and_comment_id", using: :btree

  create_table "resource_comments", force: true do |t|
    t.string   "resource_path"
    t.integer  "comment_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "resource_comments", ["resource_path", "comment_id"], name: "index_resource_comments_on_resource_path_and_comment_id", using: :btree

  create_table "resources", force: true do |t|
    t.string   "comment"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "filename"
    t.string   "content_type"
    t.integer  "repo_id"
    t.integer  "directory_id"
  end

  add_index "resources", ["directory_id"], name: "index_resources_on_directory_id", using: :btree
  add_index "resources", ["repo_id"], name: "index_resources_on_repo_id", using: :btree

  create_table "sessions", force: true do |t|
    t.string   "session_id", null: false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], name: "index_sessions_on_session_id", unique: true, using: :btree
  add_index "sessions", ["updated_at"], name: "index_sessions_on_updated_at", using: :btree

  create_table "user_ideas", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
