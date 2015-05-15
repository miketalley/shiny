class AddColorCostsToCards < ActiveRecord::Migration
  def change
    change_table :cards do |t|
      t.decimal :cost_white
      t.decimal :cost_blue
      t.decimal :cost_green
      t.decimal :cost_red
      t.decimal :cost_brown
    end
  end
end
