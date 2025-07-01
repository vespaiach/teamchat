# frozen_string_literal: true

module IdExtractor
  def extract_id(object_or_object_id)
    case object_or_object_id
    when Integer
      object_or_object_id.positive? ? object_or_object_id : nil
    when String
      id = object_or_object_id.to_i
      id.positive? ? id : nil
    else
      object_or_object_id.respond_to?(:id) ? object_or_object_id.id : nil
    end
  end
end
