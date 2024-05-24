# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Event.destroy_all

# Создаем новые записи
Event.create!(
  event: 'Летний концерт в Москве',
  event_datetime: '2024-05-01T20:00:00Z',
  place: 'Москва'
)

Event.create!(
  event: 'Летний концерт в Питере',
  event_datetime: '2024-05-15T20:00:00Z',
  place: 'Санкт-Петербург'
)

Event.create!(
  event: 'Летний концерт в Латвии',
  event_datetime: '2024-05-10T19:30:00Z',
  place: 'Рига'
)

Event.create!(
  event: 'Летний концерт в Турции',
  event_datetime: '2024-06-01T19:30:00Z',
  place: 'Фетхие'
)

Event.create!(
  event: 'Летний концерт в Кипре',
  event_datetime: '2024-06-05T19:30:00Z',
  place: 'Лимассол'
)

Event.create!(
  event: 'Впервые в Израиле',
  event_datetime: '2024-06-30T19:30:00Z',
  place: 'Тель-Авив'
)


Ticket.destroy_all

events = Event.all

events.each do |event|
  # Создаем билеты для категории "fan"
  150.times do |i|
    Ticket.create!(
      ticket_number: i + 1,
      category: 'fan',
      status: 'free',
      event_date: event.event_datetime
    )
  end

  # Создаем билеты для категории "vip"
  50.times do |i|
    Ticket.create!(
      ticket_number: i + 151, # Стартовый номер для vip билетов
      category: 'vip',
      status: 'free',
      event_date: event.event_datetime
    )
  end
end