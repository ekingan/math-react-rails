class Api::V1::ClientsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_client, only: %i[show update destroy activate]

  def index
    @clients = current_user.clients.all
  end

  def show
    if authorized?
      respond_to { |format| format.json { render :show } }
    else
      handle_unauthorized
    end
  end

  def create
    @client = current_user.clients.build(client_params)
    if authorized?
      respond_to do |format|
        if @client.save
          format.json do
            render :show,
                   status: :created,
                   location: api_v1_client_path(@client)
          end
        else
          format.json do
            render json: @client.errors, status: :unprocessable_entity
          end
        end
      end
    else
      handle_unauthorized
    end
  end

  def update
    if authorized?
      respond_to do |format|
        if @client.update(client_params)
          format.json do
            render :show,
                   status: :ok,
                   location: api_v1_client_path(@client)
          end
        else
          format.json do
            render json: @client.errors, status: :unprocessable_entity
          end
        end
      end
    else
      handle_unauthorized
    end
  end

  def destroy
    if authorized?
      @client.destroy
      respond_to { |format| format.json { head :no_content } }
    else
      handle_unauthorized
    end
  end

  def activate
    if authorized?
      respond_to do |format|
        if @client.activate
          format.json do
            render :show,
                   status: :ok,
                   location: api_v1_client_path(@client)
          end
        else
          format.json do
            render json: @client.errors, status: :unprocessable_entity
          end
        end
      end
    else
      handle_unauthorized
    end
  end

  private

  def client_params
    params.require(:client).permit(:first_name, :last_name, :company, :email, category_ids: [])
  end

  def set_client
    @client = Client.find(params[:id])
  end

  def authorized?
    @client.user == current_user
  end

  def handle_unauthorized
    unless authorized?
      respond_to { |format| format.json { render :unauthorized, status: 401 } }
    end
  end
end
