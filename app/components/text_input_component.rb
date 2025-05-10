# frozen_string_literal: true

class TextInputComponent < ViewComponent::Base
  def initialize(disabled: false, options: {})
    @disabled = disabled
    @options = options
  end


  def logo_classes
    base_classes = Set.new(%w[flex items-center justify-center gap-2 outline-none])

    if @size == LogoComponent::SMALL
      base_classes << %w[text-xl]
    else
      base_classes << %w[text-4xl]
    end

    if @options[:class]
      base_classes.add(@options[:class].split)
    end

    base_classes
  end


  def tag_name
    @href ? :a : :div
  end


  def html_attributes
    attrs = {}

    attrs[:class] = logo_classes.to_a.join(' ')

    attrs[:aria] = { label: 'CHAT' }

    attrs[:href] = @href if @href

    attrs[:xmlns] = 'http://www.w3.org/2000/svg'

    attrs[:viewBox] = '0 0 512 512'

    attrs[:fill] = 'currentColor'

    attrs.merge!(@options.except(:class))

    attrs
  end


  def svg_attributes
    attrs = {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 512 512',
      fill: 'currentColor',
      class: 'text-primary'
    }

    if @size == LogoComponent::SMALL
      attrs[:height] = '1.125rem'
    else
      attrs[:height] = '3rem'
    end

    attrs
  end

  erb_template <<~ERB
    <div>
      <label for="email" class="block">Email</label>
      <input type="email" id="email" name="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Email">
    </div>
  ERB
end
