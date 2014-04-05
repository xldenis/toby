class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :token
      t.string :provider
      t.string :secret
      t.datetime :expires_at
      t.string :name
      t.string :identifier

      t.timestamps
    end
  end
end
