import { useDispatch } from "react-redux";
import Routers from "./Routers";
import { _getCategories } from "./https/categories";
import _getCategoriesList from "./redux/action/categories";
import { errorRequestHandel } from "./utils.js/helper";
import { useEffect } from "react";

function App() {

  const dispatch = useDispatch();
  
  const fetchCategoriesList = async () => {
      try {
        const response = await _getCategories();
        if (response.status === 200) {
          dispatch(_getCategoriesList(response.data));
        }
      } catch (error) {
        errorRequestHandel({ error: error });
      } finally {
        // setLoading(false);
      }
    };

  useEffect(() => {
    fetchCategoriesList()
  }, []);


  return <Routers />;
}

export default App;
