# frozen_string_literal: true

class ButtonComponent < ViewComponent::Base
  def initialize(text: nil, href: nil, full_width: true, disabled: false, options: {})
    @text = text
    @href = href
    @full_width = full_width
    @disabled = disabled
    @options = options
  end


  def button_classes
    base_classes = Set.new(%w[font-bold py-2.5 px-4 rounded-md text-base])

    if @disabled
      base_classes.add(%w[bg-gray-400 text-gray-200 cursor-not-allowed])
    else
      base_classes.add(%w[bg-red-700 hover:bg-red-600 text-white cursor-pointer])
    end

    if @full_width
      base_classes.add('w-full')
    end

    if @options[:class]
      base_classes.add(@options[:class].split)
    end

    base_classes
  end


  def tag_name
    @href ? :a : :button
  end


  def html_attributes
    attrs = {}

    attrs[:class] = button_classes.to_a.join(' ')

    if @disabled
      attrs[:disabled] = true
      attrs[:aria] = { disabled: true }
    end

    attrs[:href] = @href if @href

    attrs.merge!(@options.except(:class))

    attrs
  end


  def call
    content_tag(tag_name, @text, html_attributes) do
      if block_given?
        yield
      else
        @text
      end
    end
  end
end
