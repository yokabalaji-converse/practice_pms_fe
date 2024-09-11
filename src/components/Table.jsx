import React, { useEffect, useState } from "react";
import { Dropdown, Input, Button } from "semantic-ui-react";
import Modal from "react-modal";
import LevelConfig from "./LevelConfig";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import StatusConfig from "./StatusConfig";
import DateRangePicker from "./DateRangePicker";
import { ViewProjectDetail } from "./ViewProjectDetail";
import EditProjectDetails from "./EditProjectDatails";
import { id } from "date-fns/locale";

export const Table = () => {
  const [projects, setProjects] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  // const [levelInputs, setLevelInputs] = useState([]);
  const [ownerdata, setOwnerdata] = useState(" ");
  const [projectStatus, setProjectStatus] = useState(" ");
  const [groups, setGroups] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [formData, setFormData] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [createProject, setCreateProject] = useState(false);

  const [tagNameInput, settagNameInput] = useState("");

  const [updatePayload, setUpdatePayload] = useState({});

  const [veiwDataModal, setViewDataModal] = useState(false);

  const [editButtonClick, setEditButtonClick] = useState(false);

  const [selectedData, setSelectedData] = useState(" ");

  const [newGroupName, setNewGroupName] = useState("");

  console.log("formdataaaaaaaaaaaaaa", formData);

  console.log("projectssssssssssss", projects);

  const openVewiData = () => {
    setViewDataModal(true);
  };

  const closeVewiData = () => {
    setViewDataModal(false);
  };

  const openPage = (n) => {
    setPageNumber(n);
  };

  // console.log("dataaaaaaaaaaaaaaaaaaaaaaasssss", projects);

  const projectsLength = projects.length;
  const projectDigitLength = projectsLength.toString.length;

  const newProjectId = `CDS ${
    projectDigitLength <= 1 ? "00" : projectDigitLength < 3 ? "0" : ""
  }${projectsLength + 1}`;

  const createGroupName = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        groupName: newUserName,
      }),
      redirect: "follow",
    };

    fetch("http://localhost:3000/groups", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const getProjectData = async () => {
    try {
      const response = await fetch("http://localhost:3000/projects", {
        method: "GET",
      });

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getOwnersData = async () => {
    try {
      const response = await fetch("http://localhost:3000/owners", {
        method: "GET",
      });

      const data = await response.json();
      setOwnerdata(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getProjectStatus = async () => {
    try {
      const response = await fetch("http://localhost:3000/project-status", {
        method: "GET",
      });

      const data = await response.json();
      setProjectStatus(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (editButtonClick) {
      setUpdatePayload({
        projectName: formData?.projectName,
        startDate: formData?.startDate,
        endDate: formData?.endDate,
        projectId: formData?.projectId,
        tasksPercentage: formData?.tasksPercentage,
        roleUp: formData?.roleUp,
        description: formData?.description,
        projectAccess: formData?.projectAccess,
        document: formData?.document,
        timeSheet: formData?.timeSheet,
        subtask: formData?.subtask,
        dependency: formData?.dependency,
        statusTimeline: formData?.statusTimeline,
        activityStream: formData?.activityStream,
        groupName: formData?.group?.groupName,
        ownerId: formData?.owner?.id,
        projectStatusId: formData?.projectStatus?.id,
        levels: formData?.levels.map((data) => ({
          levelName: data.levelName,
          colorCode: data.colorCode,
        })),
        tagNames: formData?.tagNames.map((data) => data.tagName),
        status: formData?.status.map((data) => ({
          statusName: data.statusName,
          colourCode: data.colourCode,
        })),
        createdBy: formData?.createdBy,
      });
    }
  }, [formData]);

  const editProjectApi = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(updatePayload);

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:3000/projects/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const getGroups = async () => {
    try {
      const response = await fetch("http://localhost:3000/groups", {
        method: "GET",
      });

      const data = await response.json();
      if (data) {
        setGroups(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //post api project
  const craeteProjectApi = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ ...formData });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/projects",
        requestOptions
      );
      if (response.status === 201) {
        console.log("responsehjsonnnn", await response.json());
        getProjectData();
        setModelOpen(false);
      }
      console.log("responseeeeeeeeeeeeeeeeeeee ", response);
    } catch (error) {
      console.log(error);
    }
  };
  //post api project ends

  const handleSave = () => {
    if (newUserName.trim() !== "") {
      console.log("New User Saved:", newUserName);

      setShowInput(false);
      setNewUserName("");
    }
  };



  useEffect(() => {
    getProjectData();

    getOwnersData();
    getProjectStatus();
    getGroups();
  }, []);

  const dataOptions = groups.map((item) => ({
    key: item.id,
    text: item.groupName,
    value: item.groupName,
  }));

  const dropdownOptions = [
    {
      key: "createNew",
      text: "Create Group",
      groupName: "createNew",
      value: "createNew",
      icon: "add",
    },
    ...dataOptions,
  ];

  const owners = Array.isArray(ownerdata) ? ownerdata : [];
  const options = owners.map((owner, index) => ({
    name: "ownerId",
    key: index,
    value: owner.id,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={owner.imageUrl}
          alt="img"
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        {owner.userName}
      </div>
    ),
  }));
  const defaultValue = formData.owner
    ? options.find((option) => option.value === formData.owner.id)
    : null;

  const defaultStatusValue = formData.projectStatus
    ? formData.projectStatus.id
    : formData.projectStatus;

  const handleDropdownChange = (e, { value }) => {
    setFormData({ ...formData, ["groupName"]: value });
    setValue("owner", value);

    if (value === "createNew") {
      setShowInput(true);
    }

    if (value !== "createNew") {
      setShowInput(false);
    }
  };

  const handleCancel = () => {
    setShowInput(!showInput);
    setNewUserName("");
  };

  const openModal = () => {
    console.log("clicked");
    setCreateProject(true);
    setModelOpen(true);
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const closeModal = () => {
    setModelOpen(false);
  };
  Modal.setAppElement("#yourAppElement");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
    },
  };
  const handleInputChange = (e) => {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeee  ", e);

    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const changeTagName = (e) => {
    const { value } = e.target;
    settagNameInput(value);
  };

  const addTagNames = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tagNames: [
        ...(prevFormData.tagNames || []),
        editButtonClick ? { tagName: tagNameInput } : tagNameInput,
      ],
    }));
    settagNameInput("");
  };

  const handleSelectChange = (e) => {
    const { name, value } = e;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  console.log("________ddddddddddddddddd<", formData);

  console.log("selesctedddddd dataaaa", selectedData);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end items-center mr-10 mt-2">
        <button
          className="hover:bg-sky-400 border-2 p-5 bg-slate-500 text-white  rounded-lg"
          type="button"
          onClick={openModal}
        >
          Create Project
        </button>
      </div>
      <table className="min-w-full text-sm text-left text-gray-500">
        <caption className="text-red-400 text-2xl font-bold  my-4">
          Our Project Data
        </caption>
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Project Name</th>
            <th className="p-4">Owner</th>
            <th className="p-4">Status</th>
            <th className="p-4">Start Date</th>
            <th className="p-4">End Date</th>
            <th className="p-4">Created By</th>
            <th className="p-4">Modified By</th>
            <th className="p-4">Tasks</th>
            <th className="p-4">Project Group</th>
            <th className="p-4">View</th>
            <th className="p-4">Edit</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{project.id}</td>
                <td className="p-4">{project.projectName}</td>
                <td className="p-4 flex items-center">
                  <img
                    src={project.owner?.imageUrl}
                    alt="Owner"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  {project.owner?.userName}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white`}
                    style={{
                      backgroundColor:
                        project.projectStatus?.colourCode || "#gray",
                    }}
                  >
                    {project.projectStatus?.statusName}
                  </span>
                </td>
                <td className="p-4">
                  {new Date(project.startDate).toLocaleDateString()}
                </td>
                <td className="p-4">
                  {new Date(project.endDate).toLocaleDateString()}
                </td>
                <td className="p-4">{project.createdBy}</td>
                <td className="p-4">
                  {project.updatedBy ? project.updatedBy : "N/A"}
                </td>
                <td className="p-4">
                  <div className="flex items-center">
                    <span className="ml-2 text-gray-500">
                      {project.tasksPercentage}%
                    </span>
                  </div>
                </td>
                <td className="p-4">{project.group?.groupName}</td>
                <td
                  className="p-4"
                  onClick={() => {
                    openVewiData();
                    setSelectedData(project);
                    setFormData({});
                    setEditButtonClick(false);
                  }}
                >
                  View
                </td>
                <td
                  className="p-4"
                  onClick={() => {
                    openModal();
                    setFormData(project);
                    setEditButtonClick(true);
                  }}
                >
                  Edit
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="p-4 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal
        isOpen={veiwDataModal}
        onRequestClose={closeVewiData}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="shadow h-[500px] w-[700px]">
          <ViewProjectDetail selectedData={selectedData} />
        </div>
      </Modal>

      <div className="shadow">
        <Modal
          isOpen={modelOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="bg-white shadow p-10 pt-2 h-[700px] w-[100%]">
            <div className="flex justify-evenly mb-10">
              <div>
                <button
                  className="hover:text-[#624DE3]   text-[#778294] w-auto m-5 flex flex-col items-center justify-center"
                  onClick={() => openPage(1)}
                >
                  <span className="mt-2 w-[40px] flex justify-center items-center h-[40px] border-2  p-3 rounded-full ">
                    01
                  </span>
                  <br />
                  <span className="text-nowrap">Basic Details</span>
                </button>
              </div>
              <div>
                <button
                  onClick={() => openPage(2)}
                  className="hover:text-[#624DE3]  text-[#778294] w-auto m-5 flex flex-col items-center justify-center"
                >
                  <span className="mt-2 w-[40px] flex justify-center items-center h-[40px] border-2  p-3 rounded-full ">
                    02
                  </span>
                  <br />
                  <span className="text-nowrap">Levels Configuration</span>
                </button>
              </div>
              <div>
                <button
                  onClick={() => openPage(3)}
                  className="hover:text-[#624DE3]  text-[#778294] w-auto m-5 flex flex-col items-center justify-center"
                >
                  <span className="mt-2 w-[40px] flex justify-center items-center h-[40px] border-2  p-3 rounded-full ">
                    03
                  </span>
                  <br />
                  <span className="text-nowrap">
                    Task Details Configuration
                  </span>
                </button>
              </div>
              <div>
                <button
                  onClick={() => openPage(4)}
                  className="hover:text-[#624DE3]  text-[#778294] w-auto m-5 flex flex-col items-center justify-center"
                >
                  <span className="mt-2  w-[40px] flex justify-center items-center h-[40px] border-2  p-3 rounded-full ">
                    04
                  </span>
                  <br />
                  <span className="text-nowrap">Additional Configuration</span>
                </button>
              </div>
            </div>

            {pageNumber === 1 && (
              <div>
                <div className="p-4 border rounded">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="projectId"
                      disabled={true}
                      value={
                        editButtonClick ? formData.projectId : newProjectId
                      }
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      className="border p-2 rounded"
                    />

                    <input
                      type="text"
                      name="projectName"
                      placeholder="Project Name"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      className="border p-2 rounded"
                    />
                    <DateRangePicker
                      formData={formData}
                      setFormData={setFormData}
                      register={register}
                    />

                    <textarea
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="border p-2 rounded col-span-2"
                    />

                    <Select
                      placeholder="Owner"
                      options={options}
                      defaultValue={defaultValue}
                      onChange={handleSelectChange}
                      className="border p-2 rounded"
                    />
                    <label className="flex-col" htmlFor="">
                      Project Access
                      <select
                        placeholder="ProjectAccess"
                        name="projectAccess"
                        value={formData.projectAccess}
                        onChange={handleInputChange}
                        className="border p-1 rounded ml-3 w-[21rem] h-12"
                      >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                      </select>
                    </label>
                    <label className="flex-col" htmlFor="">
                      Project Status
                      <select
                        name="projectStatusId"
                        placeholder="Status"
                        value={defaultStatusValue}
                        onChange={handleInputChange}
                        className="border p-1 rounded ml-3 w-[21rem] h-12"
                      >
                        {Array.isArray(projectStatus) &&
                          projectStatus.map((item, index) => (
                            <option key={index} value={item?.id}>
                              {item?.statusName}
                            </option>
                          ))}
                      </select>
                    </label>

                    <Controller
                      control={control}
                      name="groupName"
                      render={({ field }) => (
                        <Dropdown
                          placeholder="Group"
                          fluid
                          selection
                          options={["", ...dropdownOptions]}
                          value={formData?.group?.groupName}
                          onChange={(_, { groupName, value }) => {
                            field.onChange(value);
                            handleDropdownChange(_, { value });
                          }}
                        />
                      )}
                    />

                    {showInput && (
                      <div style={{ marginTop: "10px" }}>
                        <Input
                          placeholder="Enter new user name"
                          value={newGroupName?.groupName}
                          onChange={(e) =>
                            setNewGroupName({ groupName: e.target.value })
                          }
                          style={{ marginRight: "10px" }}
                        />
                        <Button
                          primary
                          onClick={() => {
                            setGroups([...groups, newGroupName]);
                            setShowInput(!showInput);
                            setNewUserName("");
                          }}
                        >
                          Save
                        </Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                      </div>
                    )}

                    <div>
                      <input
                        type="text"
                        name="tagNames"
                        placeholder="Tag Name"
                        value={
                          editButtonClick
                            ? formData?.tagNames?.tagName
                            : tagNameInput
                        }
                        onChange={changeTagName}
                        className="border p-2 rounded"
                      />
                      <button
                        onClick={addTagNames}
                        className="h-[20px] w-[50px] ml-4 mt-4 rounded-md bg-green-500"
                      >
                        ADD
                      </button>

                      {/* {createProject &&
                        (formData.tagNames || []).map((tag, index) => (
                          <button
                            key={index}
                            name="tagNames"
                            className="border-2 w-20 p-2 m-2 rounded"
                          >
                            {tag}
                          </button>
                        ))} */}

                      {editButtonClick && (
                        <ul>
                          {formData.tagNames.map((tag) => (
                            <li key={tag.id}>
                              <input
                                type="text"
                                name="tagNames"
                                placeholder="Tag Name"
                                value={tag.tagName}
                                onChange={changeTagName}
                                className="border p-2 rounded"
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="roleUp"
                          checked={formData.roleUp}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Start date, end date, % completion, work hours, and log
                        hours are rolled up from subtasks to tasks
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {pageNumber === 2 && (
              <div>
                <div>
                  <LevelConfig
                    formData={formData}
                    editButtonClick={editButtonClick}
                    setFormData={setFormData}
                    register={register}
                  />
                </div>
              </div>
            )}
            {pageNumber === 3 && (
              <StatusConfig
                editButtonClick={editButtonClick}
                formData={formData}
                setFormData={setFormData}
                register={register}
              />
            )}
            {pageNumber === 4 && (
              <>
                <div className="flex items-center gap-[110px] mt-5">
                  <label className="font-semibold">Document</label>
                  <input
                    type="checkbox"
                    name="document"
                    checked={formData.document}
                    onChange={handleInputChange}
                    className="mr-2  p-10 mt-5"
                  />
                </div>
                <div className=" flex items-center gap-[110px] mt-5">
                  <label>Time sheet</label>
                  <input
                    name="timeSheet"
                    checked={formData.timeSheet}
                    onChange={handleInputChange}
                    className="mr-2"
                    type="checkbox"
                  />
                </div>
                <div className="flex items-center gap-[130px] mt-5">
                  <label>Sub task</label>
                  <input
                    type="checkbox"
                    name="subtask"
                    checked={formData.subtask}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                </div>
                <div className="flex items-center gap-[105px] mt-5">
                  <label>Dependency</label>
                  <input
                    type="checkbox"
                    name="dependency"
                    checked={formData.dependency}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                </div>
                <div className="flex items-center gap-[88px] mt-5">
                  <label>Status Timeline</label>
                  <input
                    type="checkbox"
                    name="statusTimeline"
                    checked={formData.statusTimeline}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                </div>
                <div className="flex items-center gap-[90px] mt-5">
                  <label>Activity Stream</label>
                  <input
                    type="checkbox"
                    name="activityStream"
                    checked={formData.activityStream}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                </div>
              </>
            )}

            <div className="flex justify-center items-center mt-[50px]">
              <button
                onClick={() => {
                  if (pageNumber > 1) {
                    setModelOpen(false);
                  } else {
                    setModelOpen(false);
                  }
                }}
                className="bg-[#FFFFFF] w-[150px] m-5  text-[#624DE3] font-bold h-[40px] shadow border-2 rounded-md border-[#624DE3]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  editButtonClick && pageNumber === 4
                    ? editProjectApi(formData.id)
                    : !editButtonClick && pageNumber === 4
                    ? craeteProjectApi()
                    : setPageNumber(pageNumber + 1);
                }}
                className="bg-[#624DE3] w-[150px] m-5 text-[#FFFFFF] font-bold h-[40px] shadow  rounded-md"
              >
                {editButtonClick && pageNumber === 4
                  ? "Update"
                  : !editButtonClick && pageNumber === 4
                  ? "Submit"
                  : "Next"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
