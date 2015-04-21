class CardsController < ApplicationController
  before_action :set_card, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @cards = Card.all
    respond_with(@cards)
  end

  def show
    respond_with(@card)
  end

  def new
    @card = Card.new
    respond_with(@card)
  end

  def edit
  end

  def create
    @card = Card.new(card_params)
    @card.save
    respond_with(@card)
  end

  def update
    @card.update(card_params)
    respond_with(@card)
  end

  def destroy
    @card.destroy
    respond_with(@card)
  end

  private
    def set_card
      @card = Card.find(params[:id])
    end

    def card_params
      # params[:card]
      params.require(:card).permit(
        :type,
        :level,
        :color,
        :points,
        :cost
      )
    end
end
