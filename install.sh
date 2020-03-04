if [ ${ENV} = "prod" ]; then
    echo "Running on Production"
    npm run prod
else
    echo "Running on Development"
    npm run dev
fi
