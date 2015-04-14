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

ActiveRecord::Schema.define(version: 20150412181457) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string   "comment",    limit: 255, null: false
    t.integer  "user_id",                null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "contacts", force: :cascade do |t|
    t.string   "fname",      limit: 255, null: false
    t.string   "lname",      limit: 255, null: false
    t.string   "email",      limit: 255, null: false
    t.string   "reason",     limit: 255, null: false
    t.string   "message",    limit: 255, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "data_files", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ideas", force: :cascade do |t|
    t.string   "name",                   limit: 255
    t.string   "description",            limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.string   "cover_img_file_name",    limit: 255
    t.string   "cover_img_content_type", limit: 255
    t.integer  "cover_img_file_size"
    t.datetime "cover_img_updated_at"
  end

  add_index "ideas", ["user_id"], name: "index_ideas_on_user_id", using: :btree

  create_table "participations", force: :cascade do |t|
    t.integer  "idea_id"
    t.integer  "user_id"
    t.boolean  "owner"
    t.boolean  "admin"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pull_requests", force: :cascade do |t|
    t.integer "repository_id",                                   null: false
    t.string  "message",       limit: 255,                       null: false
    t.integer "to_repo_id"
    t.string  "status",        limit: 255, default: "SUBMITTED", null: false
  end

  add_index "pull_requests", ["repository_id"], name: "index_pull_requests_on_repository_id", using: :btree
  add_index "pull_requests", ["to_repo_id"], name: "index_pull_requests_on_to_repo_id", using: :btree

  create_table "repositories", force: :cascade do |t|
    t.integer "idea_id",                     null: false
    t.boolean "pull_request_id"
    t.string  "path",            limit: 255
    t.integer "user_id"
  end

  add_index "repositories", ["idea_id"], name: "index_repositories_on_idea_id", using: :btree
  add_index "repositories", ["user_id"], name: "index_repositories_on_user_id", using: :btree

  create_table "repository_comments", force: :cascade do |t|
    t.integer  "repository_id"
    t.integer  "comment_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "repository_comments", ["repository_id", "comment_id"], name: "index_repository_comments_on_repository_id_and_comment_id", using: :btree

  create_table "resource_comments", force: :cascade do |t|
    t.string   "resource_path", limit: 255
    t.integer  "comment_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "resource_comments", ["resource_path", "comment_id"], name: "index_resource_comments_on_resource_path_and_comment_id", using: :btree

  create_table "resources", force: :cascade do |t|
    t.string   "comment",      limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "filename",     limit: 255
    t.string   "content_type", limit: 255
    t.integer  "repo_id"
    t.integer  "directory_id"
  end

  add_index "resources", ["directory_id"], name: "index_resources_on_directory_id", using: :btree
  add_index "resources", ["repo_id"], name: "index_resources_on_repo_id", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.string   "session_id", limit: 255, null: false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], name: "index_sessions_on_session_id", unique: true, using: :btree
  add_index "sessions", ["updated_at"], name: "index_sessions_on_updated_at", using: :btree

  create_table "user_ideas", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               limit: 255,              null: false
    t.string   "uid",                    limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                      default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.string   "confirmation_token",     limit: 255
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email",      limit: 255
    t.string   "name",                   limit: 255
    t.string   "nickname",               limit: 255
    t.string   "image",                  limit: 255
    t.string   "email",                  limit: 255
    t.text     "tokens"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name",       limit: 255
    t.string   "avatar_content_type",    limit: 255
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree

end
