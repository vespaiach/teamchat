# frozen_string_literal: true

class ApplicationQuery
  private attr_reader :relation
  def initialize(relation) = @relation = relation
  def resolve(...) = relation
  class << self
    def resolve(...) = new.resolve(...)
    alias_method :call, :resolve
  end
end
