  useEffect(() => {
    getProjectData();

    getOwnersData();
    getProjectStatus();
    getGroups();
  }, []);