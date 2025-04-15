class LinkMessage < Chat
  store_accessor :custom_data, :url
  store_accessor :custom_data, :caption
  store_accessor :custom_data, :description

  validates :url, presence: true
end
