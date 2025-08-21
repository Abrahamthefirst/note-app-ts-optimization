import axios from './axios';

type params = {
  [key: string]: any;
};
const crud = {
  getResources: async <ResourceType>(
    resource: string,
    params?: params
  ): Promise<ResourceType[]> => {
    try {
      const { data } = await axios.get(resource, params);

      if (!data) return []
      const resources = data as unknown as ResourceType[];

      return resources;
    } catch (err) {
      console.log(err, "This is resource error")
      throw err;
    }
  },

  createResource: async <ResourceType>(
    url: string,
    data: any
  ): Promise<ResourceType> => {
    const response = await axios.post(url, data);

    const resource = response as unknown as ResourceType;

    return resource;
  },

  getResourceById: async <ResourceType extends { id: string }>(
    url: string
  ): Promise<ResourceType | null> => {
    const response = await axios.get(url);

    const resource = response as unknown as ResourceType;

    return resource;
  },

  updateResourceById: async <ResourceType extends { id: string }>(
    url: string,
    data: ResourceType
  ): Promise<ResourceType | null> => {
    const response = await axios.post(url, data);

    const resource = response as unknown as ResourceType;

    return resource;
  },

  deleteResourceById: async (url: string): Promise<string | null> => {
    const response = await axios.delete(url);
    return response as unknown as string;
  },
};

export default crud;
