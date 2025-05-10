# frozen_string_literal: true

class LogoComponent < ViewComponent::Base
  SMALL = 'small'
  LARGE = 'large'

  def initialize(size: LogoComponent::LARGE, href: nil, shorten: false, options: {})
    @size = size
    @href = href
    @shorten = shorten
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

  def h1_attributes
    attrs = { aria: { label: 'CHAT' } }
    attrs[:class] = 'leading-[1]'

    if @size == LogoComponent::SMALL
      attrs[:class] += ' track-tight text-base'
    end

    if @shorten
      attrs[:class] += ' hidden'
    end

    attrs
  end
end
