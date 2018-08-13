class Api::V1::UsersController < Api::ApplicationController
    before_action :authenticate_user!, only: [:current]
  
    def current
      render json: current_user
    end

    # def create
    #     user = User.create(
    #       admin: false,
    #       first_name: params[:first_name],
    #       last_name: params[:last_name],
    #       email: params[:email],
    #       password: params[:password]
    #     )
    #     # user = User.find_by(email: params[:email])
    #     if user&.authenticate(params[:password])
    #         session[:user_id] = user.id
    #         render json: {id: user.id}
    #     end
    #     # session[:user_id] = @user.id
    #     # render json: {id: user.id}
    #     # puts "Given Password is #{params[:password]}"
    #     # puts "Creating a new user with #{@user.password}!"
    #     # if @user.save!
    #     #   puts 'Saved a new user!'
    #     #   # The `session` is an object useable in controllers
    #     #   # that uses cookies to store encrypted data. To sign
    #     #   # in a user, we store their `user_id` in the session for
    #     #   # later retrieval.
    #     #   session[:user_id] = @user.id
    #     #   render json: {id: user.id}
    #     # end
    #     # puts 'Done Creating a new user!'
    #   end

    # private
    # def user_params
    #   params.require(:user).permit(
    #     :first_name, :last_name, :email, :password
    #   )
    # end
end
