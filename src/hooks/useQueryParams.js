import { useLocation, useNavigate } from "react-router";

export const useQueryParams = (searchParams) => {
  const navigate = useNavigate();
  const location = useLocation();

  const deleteSearchParamList = ({ name }) => {
    searchParams.delete(name);
    if (searchParams.toString() === "") {
      navigate(location.pathname);
      return;
    }
    navigate(`?${searchParams.toString()}`);
  };

  const appendSearchParams = ({ name, value }) => {
    if (name !== "" && value !== "") {
      if (searchParams.toString() === "") {
        navigate(`?${searchParams.toString()}${name}=${value}`);
        return;
      }
      navigate(`?${searchParams.toString()}&${name}=${value}`);
    }
  };

  const deleteOneSearchParam = ({ name, value }) => {
    const paramList = Array.from(searchParams.getAll(name)).filter(
      (list) => list !== value
    );
    searchParams.delete(name);

    if (paramList.length > 0) {
      const queryString = paramList.reduce(
        (string, value) => string + `&${name}=${value}`,
        `?${searchParams.toString()}`
      );
      navigate(queryString);
      return;
    }

    navigate(`?${searchParams.toString()}`);
  };

  const replaceSearchParams = ({ name, value }) => {
    if (name !== "" && value !== "") {
      searchParams.delete(name);
      appendSearchParams({ name, value });
    }
  };

  const setCheckBoxCatergory = (e, name, value) => {
    e.target.checked
      ? appendSearchParams({ name, value })
      : deleteOneSearchParam({ name, value });
  };

  const setCheckBoxFilter = (e, name, value) => {
    e.target.checked
      ? appendSearchParams({ name, value })
      : deleteSearchParamList({ name });
  };

  return {
    deleteSearchParamList,
    deleteOneSearchParam,
    appendSearchParams,
    replaceSearchParams,
    setCheckBoxCatergory,
    setCheckBoxFilter,
  };
};
