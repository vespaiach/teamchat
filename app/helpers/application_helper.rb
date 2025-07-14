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

  def inject_assets(entry_point)
    manifest_path = Rails.root.join('public', 'tmp', 'manifest.json')

    return '' unless File.exist?(manifest_path)

    begin
      manifest = JSON.parse(File.read(manifest_path))
      entry_points = manifest['entryPoints'] || {}

      # Find the entry point by matching the entry_point parameter
      # It could be either a direct key match or a basename match
      entry_data = find_entry_point(entry_points, entry_point)

      return '' unless entry_data

      html_parts = []

      # Add modulepreload links for dependencies first
      if entry_data['imports']
        entry_data['imports'].each do |import|
          file_path = import['path']
          html_parts << tag(:link, rel: 'modulepreload', href: file_path)
        end
      end

      # Add the main script tag
      main_js = entry_data['path']
      html_parts << tag(:script, type: 'module', defer: true, src: main_js)

      html_parts.join("\n").html_safe
    rescue JSON::ParserError => e
      Rails.logger.error "Failed to parse manifest.json: #{e.message}"
      ''
    rescue => e
      Rails.logger.error "Error in inject_assets: #{e.message}"
      ''
    end
  end

  private

  def find_entry_point(entry_points, entry_point)
    # First try direct key match
    return entry_points[entry_point] if entry_points[entry_point]

    # Then try to find by basename or partial match
    entry_points.each do |key, value|
      # Extract the view name from the path (e.g., "sign-in" from "frontend/src/views/sign-in/index.tsx")
      view_name = key.split('/').select { |part| part != 'index.tsx' }.last
      return value if view_name == entry_point

      # Also check if the entry_point matches the generated js filename pattern
      js_base = value['js'].split('-').first
      return value if js_base == entry_point
    end

    nil
  end
end
