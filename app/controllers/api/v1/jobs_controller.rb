class Api::V1::JobsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_job, only: %i[show update destroy]

  def index
    @jobs = current_user.jobs.all
  end

  def show
    if authorized?
      respond_to { |format| format.json { render :show } }
    else
      handle_unauthorized
    end
  end

  def create
    @job = current_user.jobs.build(job_params)
    if authorized?
      respond_to do |format|
        if @job.save
          format.json do
            render :show,
                   status: :created,
                   location: api_v1_job_path(@job)
          end
        else
          format.json do
            render json: @job.errors, status: :unprocessable_entity
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
        if @job.update(job_params)
          format.json do
            render :show,
                   status: :ok,
                   location: api_v1_job_path(@job)
          end
        else
          format.json do
            render json: @job.errors, status: :unprocessable_entity
          end
        end
      end
    else
      handle_unauthorized
    end
  end

  def destroy
    if authorized?
      @job.destroy
      respond_to { |format| format.json { head :no_content } }
    else
      handle_unauthorized
    end
  end

  private

  def set_job
    @job = Job.find(params[:id])
  end

  def authorized?
    @job.user == current_user
  end

  def handle_unauthorized
    unless authorized?
      respond_to { |format| format.json { render :unauthorized, status: 401 } }
    end
  end
  def job_params
    params.require(:job).permit(:status, :year, :client_id, :category_id)
  end
end

