# frozen_string_literal: true

class TextInputComponent < ViewComponent::Base
  def initialize(disabled: false, id: nil, name: nil, label: nil, div_options: {}, input_options: {}, p_options: {})
    @disabled = disabled
    @id = id || "input-#{SecureRandom.hex(8)}"
    @name = name
    @label = label
    @div_options = div_options
    @input_options = input_options
    @p_options = p_options
  end


  def p_attributes
    attrs = {}
    attrs[:class] = 'text-xs text-red-500 invisible'
    attrs[:class] += " #{@p_options[:class]}" if @p_options[:class]
    attrs.merge!(@p_options.except(:class))
  end


  def input_attributes
    attrs = { id: @id }
    attrs[:name] = @name if @name
    attrs[:class] = 'w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-base'
    attrs[:class] += " #{@input_options[:class]}" if @input_options[:class]
    if @disabled
      attrs[:disabled] = true
      attrs[:aria] = { disabled: true }
      attrs[:class] += ' cursor-not-allowed bg-gray-300!'
    end
    attrs.merge!(@input_options.except(:class))
  end


  def div_attributes
    attrs = {}
    attrs[:class] = "#{@div_options[:class] || ''} space-y-1"
    attrs.merge!(@div_options.except(:class))
  end
end
