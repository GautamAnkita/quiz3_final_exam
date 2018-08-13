class Api::V1::UsersController < Api::ApplicationController
    before_action :authenticate_user!, only: [:current]
  
    def current
      render json: current_user
    end

    def create
        user = User.create(
          admin: false,
          first_name: params[:first_name],
          last_name: params[:last_name],
          email: params[:email],
          password: params[:password]
        )
        
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: {id: user.id}
        end
      end

    private
    def user_params
      params.require(:user).permit(
        :first_name, :last_name, :email, :password
      )
    end
end
