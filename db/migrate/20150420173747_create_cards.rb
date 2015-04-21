class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
    	t.text :type
    	t.decimal :level
    	t.text :color
    	t.decimal :points
    	t.text :cost

      	t.timestamps null: false
    end
  end
end
