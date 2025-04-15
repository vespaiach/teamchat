class PhotoMessage < Chat
  store_accessor :custom_data, :url
  store_accessor :custom_data, :size

  validates :url, presence: true
  validates :size, presence: true, numericality: { only_integer: true, greater_than: 0 }
end
