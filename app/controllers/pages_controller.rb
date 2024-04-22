# frozen_string_literal: true

class PagesController < ApplicationController
  layout "pages"

  def index
    @pages_props = { name: "Stranger" }
  end
end
