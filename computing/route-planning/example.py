import router
import file_model_loader

data = file_model_loader.get_model('data/nodes.csv')
routes = router.calculate_routes(data)

print(routes)