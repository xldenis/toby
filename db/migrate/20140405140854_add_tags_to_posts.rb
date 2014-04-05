class AddTagsToPosts < ActiveRecord::Migration
  def change 
	change_table :posts do |t|
		t.string :tags, :array =>true
	end
  end
end
