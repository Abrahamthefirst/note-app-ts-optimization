import { useState, useMemo } from 'react';

type Resource = { [key: string]: any };

type SearchFieldConfig = string | { key: string; isArray: true };

const useFilterSearch = (
  resources: Resource[] | undefined,
  searchFields: SearchFieldConfig | SearchFieldConfig[]
) => {
  const [searchTerm, setSearchTerm] = useState('');

  const normalizedSearchFields = useMemo(() => {
    if (!searchFields) {
      return [];
    }
    return Array.isArray(searchFields) ? searchFields : [searchFields];
  }, [searchFields]);

  const filteredResources = useMemo(() => {
    if (!resources || searchTerm.length === 0) {
      return resources;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return resources.filter((resource) => {
      return normalizedSearchFields.some((fieldConfig) => {
        if (typeof fieldConfig === 'object' && fieldConfig.isArray) {
          const arrayField = resource[fieldConfig.key];
          return Array.isArray(arrayField) && arrayField.some((item: string) =>
            typeof item === 'string' && item.toLowerCase().includes(lowerCaseSearchTerm)
          );
        }
        else if (typeof fieldConfig === 'string') {
          const fieldValue = resource[fieldConfig];
          return typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(lowerCaseSearchTerm);
        }

        return false;
      });
    });
  }, [resources, searchTerm, normalizedSearchFields]);

  return { searchTerm, setSearchTerm, filteredResources };
};

export default useFilterSearch;