# frozen_string_literal: true

module ApplicationHelper
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

  def json_script_tag(data, id:)
    return unless data.present?
    json_data = if data.respond_to?(:map) && !data.is_a?(String)
      data.map(&:as_json)
    else
      data.respond_to?(:as_json) ? data.as_json : data
    end
    content_tag :script, json_data.to_json.html_safe, type: 'application/json', id: id
  end
end
