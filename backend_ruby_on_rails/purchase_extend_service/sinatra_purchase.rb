# frozen_string_literal: true

require './services/purchase_service'
require 'sinatra'
require 'rack/cors'

configure do
  use Rack::Cors do
    allow do
      origins 'http://localhost:3000' # Укажите домен вашего фронтенд-приложения
      resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end
end

set :bind, '0.0.0.0'
set :port, 3000

configure do
  set :encoding, 'utf-8'
end

get '/' do
  status  406
  body "This booking is not found"
end

post '/purchase' do
  purchase = PurchaseService.new(params)
  result = purchase.call
  content_type :json
  status result[:status]
  body result.to_json
end
