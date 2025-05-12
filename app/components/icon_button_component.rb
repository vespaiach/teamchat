# frozen_string_literal: true

class IconButtonComponent < ViewComponent::Base
  def initialize(href: nil, disabled: false, options: {})
    @href = href
    @disabled = disabled
    @options = options
  end


  def tag_name
    @href ? :a : :button
  end


  def html_attributes
    attrs = {}
    attrs[:class] = 'border-none flex items-center justify-center outline-none w-8 h-8 rounded cursor-pointer'
    attrs[:class] += " #{@options[:class]}" if @options[:class]
    if @disabled
      attrs[:disabled] = true
      attrs[:aria] = { disabled: true }
    end
    attrs[:href] = @href if @href
    attrs.merge!(@options.except(:class))
  end


  def call
    content_tag(tag_name, html_attributes) { content }
  end
end
