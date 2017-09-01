Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  if Rails.root.join('tmp/caching-dev.txt').exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => 'public, max-age=172800'
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Suppress logger output for asset requests.
  config.assets.quiet = true

  # Use a different URL for serving assets in development mode, and pass all requests to Sprockets
  # http://guides.rubyonrails.org/asset_pipeline.html#local-precompilation
  config.assets.prefix = "/dev-assets"

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker

  config.webpack_dev_server_host = 'http://localhost:8080'

  config.webpack[:use_manifest] = false

  config.fake_ldap = true

  config.materials_root = 'http://localhost:5000'
  config.studies_root = 'http://localhost:3300/api/v1/'
  config.sets_root = 'http://localhost:3000/api/v1/'
  config.stamps_root = 'http://localhost:7000/api/v1/'

  config.jwt_secret_key = 'development'
  config.jwt_exp_time = 2 * 60
  config.jwt_nbf_time = 1 * 60
end
