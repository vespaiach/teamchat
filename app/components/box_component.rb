# frozen_string_literal: true

class BoxComponent < ViewComponent::Base
  def initialize(options: {})
    @options = options
  end


  def box_classes
    base_classes = Set.new(%w[bg-white shadow-xs rounded-xl min-w-[330px] w-box])

    if @options[:class]
      base_classes.add(@options[:class].split)
    end

    base_classes
  end


  def html_attributes
    attrs = {}

    attrs[:class] = box_classes.to_a.join(' ')

    attrs.merge!(@options.except(:class))

    attrs
  end


  def call
    content_tag(:div, nil, html_attributes) { content }
  end
end
