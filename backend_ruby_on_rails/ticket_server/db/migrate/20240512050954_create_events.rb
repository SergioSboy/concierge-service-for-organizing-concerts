class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :event
      t.datetime :event_datetime
      t.string :place

      t.timestamps
    end
  end
end
