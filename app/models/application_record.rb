# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  default_scope { where(deleted_at: nil) }

  def delete
    update_column :deleted_at, Time.current
  end

  def destroy
    callbacks_result = transaction do
      run_callbacks(:destroy) do
        delete
      end
    end
    callbacks_result ? self : false
  end
end
