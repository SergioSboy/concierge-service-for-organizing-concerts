class EventsController < ApplicationController

    MAX_EVENTS_LIMIT = 10

    def index
        limit = [params[:limit].to_i, MAX_EVENTS_LIMIT].min
        @events = Event.limit(limit).select(:id, :event, :event_datetime, :place)
        render json: @events
    end

    def show
        @event = Event.find_by(id: params[:id])
        if @event
            render json: @event
        else
            render json: { error: 'Event not found' }, status: :not_found
        end
    end

  end