# Modular design front-end app

A modular and scalable front-end application example developed using a component-driven approach. The project leverages React for UI management, TypeScript for functional business logic, and Next.js 14 for server-side rendering and routing. It incorporates principles of modular architecture to ensure maintainability and testability of the codebase.

### **Technologies Used**

*   **React**: JavaScript library for building user interfaces.
*   **TypeScript**: A language that adds static types to JavaScript, improving code reliability.
*   **Next.js 14**: A React framework for server-side rendering and routing.
*   **Modular Architecture**: An approach that separates concerns and facilitates code maintainability and scalability.

### **Architectural Principles**

*   **Component-Driven Development**: Development is based on autonomous, reusable, and testable components.
*   **Component-Based Design**: Each component is designed to be autonomous and independent, encapsulating logic, state, and user interface.
*   **Separation of Concerns**: Clear separation between business logic, presentation, and state management.
*   **Single Responsibility Principle**: Each component and service is responsible for a single functionality or aggregate.
*   **Service Layer Pattern**: Encapsulates data access logic in a separate layer, promoting maintainability and scalability.
*   **Container Components**: Components responsible for fetching data and passing it to presentational components.

### **Code Structure**

We need to clearly distinguish three levels in our application: **Module**, **Application**, and **Presention**

1. **Module**:
    *   This level contains autonomous and reusable components that manage independent entities and aggregates.
    *   Components at this level are designed to be composed at higher levels.
2. **Application**:
    *   This level manages the entire application.
    *   Orchestration of modules.
    *   Management of containers.
    *   Can include other UI components.
3. **Presentation**:
    *   Provides the base design or its extension for the application and modules.
    *   It is a shared dependency at the Application level.
    *   To avoid injecting styled components into the modules, it can be considered a shared library, which could be, for example, a package in a monorepo. Similar to MUI, it is accepted that modules have common dependencies.

In summary, the Design System is a shared library, and any customization is managed at the Application level, not at the level of individual Components. This approach ensures that the Design System remains consistent and that customizations are centralized and easy to manage. In this project, we have chosen MUI (Material-UI) as our external Design System. Customizations will be done using styled components. This approach ensures that the Design System remains consistent and that customizations are centralized and easy to manage.

## **Installation**

1. Clone the repository:

```plain
git clone <https://github.com/andreadotta/modular-design-app.git>
```

1. Install dependencies:

```bash
cd ModularDesignApp
pnpm i
```

1. Start the application:

```plain
pnpm run dev
```

## **Contributing**

If you wish to contribute to the project, you are welcome! Follow these guidelines to ensure your contribution aligns with the project’s goals.

1. Fork the repository.
2. Create a branch for your feature or fix:

```plain
git checkout -b feature/feature-name
```

1. Commit your changes:

```plain
git commit -m 'Add new feature'
```

1. Push the branch:

```plain
git push origin feature/feature-names
```

1. Open a Pull Request.

  

## **Module Structure**

In our project, we adopt a modular approach where each component handles a single entity or aggregate. Each component has its flexible internal architecture, adaptable to specific needs.

The architecture is divided into modules containing domain-specific logic. Each module is responsible for a particular functionality of the application and includes contexts, services, types, and ui necessary for that functionality.

#### Overview of Modules

1. **Contexts** (`contexts`): Manage global state and provide a way to share data and functions between components without explicitly passing props.
2. **Hooks** (`hooks`): Contain reusable and custom business logic that can be shared across components.
3. **Services** (`services`): Contain logic for API calls, data management, and other asynchronous operations.
4. **Stores** (`stores`): Use state management libraries (e.g., Zustand) to maintain the application's state.
5. **Types** (`types`): Define TypeScript types to improve type safety and code maintainability.
6. **UI Components** (`ui`): Contain domain-specific user interface components.

###   

#### Example of a Module

  

#### Contexts (`contexts`)

Contexts are used to manage global state and provide access and modification functions. They are created using React's `createContext` API and provided through a `Context.Provider`.

**Example**:

```typescript
// src/modules/example/contexts/example-context.tsx
import React, { createContext, useContext, ReactNode } from 'react';

// Definizione del tipo di contesto
type ExampleContextType = {
  data: string;
  setData: (data: string) => void;
  clearData: () => void;
};

// Creazione del contesto
const ExampleContext = createContext<ExampleContextType | undefined>(undefined);

// Implementazione del provider
export const ExampleProvider = ({ children }: { children: ReactNode }) => {
  const { data, setData, clearData } = useExampleStore(); // Assunzione di un hook esistente

  return (
    <ExampleContext.Provider value={{ data, setData, clearData }}>
      {children}
    </ExampleContext.Provider>
  );
};
```

####   

#### Hooks (`hooks`)

Hooks contain reusable business logic. They can be customized using React's `useState`, `useEffect`, and other hooks.

**Example**:

```typescript
// src/modules/example/hooks/use-example-store.ts


import { useState, useCallback, useEffect } from 'react';
import { fetchExampleData } from '../services/example-service';
import { useExampleStore } from '../stores/example-store';
import { Either, isRight } from '@/shared/utils/either';

type ExampleState = {
  loading: boolean;
  error: string | null;
  data: any | null;
};

export const useExample = () => {
  const [exampleState, setExampleState] = useState<ExampleState>({
    loading: false,
    error: null,
    data: null,
  });

  const { exampleData, setExampleData, clearExampleData } = useExampleStore();

  useEffect(() => {
    setExampleState({
      loading: false,
      error: null,
      data: exampleData,
    });
  }, [exampleData]);

  const fetchData = useCallback(async (id: string) => {
    setExampleState({ loading: true, error: null, data: null });

    const result: Either<Error, any> = await fetchExampleData(id)();

    if (isRight(result)) {
      const data = result.value;
      setExampleData(data);
      setExampleState({ loading: false, error: null, data });
    } else {
      setExampleState({ loading: false, error: result.value.message, data: null });
    }
  }, [setExampleData]);

  const clearData = useCallback(() => {
    clearExampleData();
    setExampleState({ loading: false, error: null, data: null });
  }, [clearExampleData]);

  return { exampleState, fetchData, clearData };
};
```

####   

#### Services (`services`)

Services handle API calls and other asynchronous operations. They are responsible for interacting with backends or other data sources, emphasizing the use of \`TaskEither\` for managing asynchronous workflows robustly.

**Example**:

```typescript
// src/modules/users/services/users-service.ts

import { isRight, right, left, Either, isLeft } from '@/shared/utils/either';
import { taskEither, TaskEither } from '@/shared/utils/task-either';
import { userAdapter } from './user-adapter';

import { CountryFromCoordinates, User } from '../types/user';
import { ErrorMessage } from '@/utils/error-message';
import fetchData from '@/shared/utils/fetch-data';
import { userValidator } from './user-validator';
import { getCountryFromCoordinates } from '@/geo';

export const getUsers = (): TaskEither<Error, User[]> => {
  const geoService = getCountryFromCoordinates;
  const validateUsers = (users: User[]): Either<Error, User[]> => {
    const validatedUsers = users.map(userValidator);
    const errors = validatedUsers.filter(isLeft);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => (err as { _tag: 'Left'; value: Error }).value.message)
        .join('; ');
      return left(new Error(ErrorMessage('Validation error') + errorMessages));
    }
    return right(
      validatedUsers.map(
        (result) => (result as { _tag: 'Right'; value: User }).value,
      ),
    );
  };
  const adapter = (
    input: any,
    geoService: CountryFromCoordinates,
  ): TaskEither<Error, User[]> => {
    const adaptTask: TaskEither<Error, User[]> = async () => {
      try {
        const users = input as any[];
        const adaptedUsers = await Promise.all(
          users.map(async (user) => {
            const adaptedUser = await userAdapter(user, geoService)();
            if (isRight(adaptedUser)) {
              return adaptedUser.value;
            }
            throw new Error(adaptedUser.value.message);
          }),
        );
        return right(adaptedUsers);
      } catch (error) {
        return left(
          new Error(
            ErrorMessage('Failed to adapt users') +
              ': ' +
              (error as Error).message,
          ),
        );
      }
    };

    return taskEither(adaptTask);
  };

  return fetchData<User[]>(
    'https://jsonplaceholder.typicode.com/users',
    (input: any) => adapter(input, geoService),
    validateUsers,
    'GET',
    {},
  );
};
```

####   

#### Stores (`stores`)

Stores manage the application's state using libraries like Zustand. They allow state sharing between various components without passing props.

**Example**:

  

```typescript
// src/modules/example/stores/example-store.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ExampleState = {
  data: string;
  setData: (data: string) => void;
  clearData: () => void;
};

export const useExampleStore = create<ExampleState>()(
  persist(
    (set) => ({
      data: '',
      setData: (data) => set({ data }),
      clearData: () => set({ data: '' }),
    }),
    {
      name: 'example-storage', // nome del local storage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
```

####   

#### Types (`types`)

Types define TypeScript interfaces and types to improve type safety and code maintainability.

Example:

```typescript
// src/modules/auth/types/auth.ts

import { z } from 'zod';

/**
 * Defines the schema for an authenticated user using zod.
 * The schema is used for runtime type validation.
 */
export const AuthUserSchema = z.object({
  id: z.number(),                // The user's ID, must be a number
  email: z.string().email(),     // The user's email, must be a string formatted as an email
});

/**
 * Defines the schema for the authentication response using zod.
 * Includes information on whether the authentication was successful, the user, and a possible error message.
 */
export const AuthResponseSchema = z.object({
  success: z.boolean(),          // Indicates if authentication was successful, must be a boolean
  user: AuthUserSchema.optional(), // The authenticated user, can be optional
  error: z.string().optional(),  // A possible error message, can be optional
});

// TypeScript types derived from the zod schemas, for use in the rest of the TypeScript code
export type AuthUser = z.infer<typeof AuthUserSchema>;   // Type for the authenticated user
export type AuthResponse = z.infer<typeof AuthResponseSchema>; // Type for the authentication response


```

####   

#### UI Components (`ui`)

UI components within modules manage state and validation or data display logic. They use libraries like `react-hook-form` for forms or `material-ui` for data grids. They provide callback functions to handle user interactions, such as `onSubmit` for forms or `onRowClick` for data grids. They implement basic validation logic and display errors or messages directly within the components.

**Example**:

```typescript
// src/modules/example/ui/ExampleForm.tsx

import { TextField, Box, Typography, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

// Define the form data type
type FormData = {
  name: string; // The name field, must be a string
  age: number;  // The age field, must be a number
};

// Define the props for the ExampleForm component
type ExampleFormProps = {
  onSubmit: (data: FormData) => void; // The submit handler function
};

// The ExampleForm component
const ExampleForm = ({ onSubmit }: ExampleFormProps) => {
  // Initialize the form using react-hook-form
  const { register, handleSubmit } = useForm<FormData>();

  // Define the submit handler function
  const onSubmitHandler: SubmitHandler<FormData> = (data) => {
    // Call the onSubmit function passed as a prop with the form data
    onSubmit(data);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Example Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
          label="Name"
          type="text"
          fullWidth
          required
          {...register('name')} // Register the name field with react-hook-form
        />
        <TextField
          label="Age"
          type="number"
          fullWidth
          required
          sx={{ marginTop: 2 }}
          {...register('age')} // Register the age field with react-hook-form
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ExampleForm;
```

  

This modular architecture and use of container components as orchestrators make the project easily extendable and maintainable. The modules contain domain-specific logic, while the containers centralize the application's flow logic, allowing for clear separation of concerns and facilitating code reusability.

  

### **Design Patterns Used**

**Component-Based Design**:

In this mini project, we adopt a Component-Based Design approach. Each component is designed to be autonomous and independent. Components are reusable units that encapsulate the logic, state, and user interface necessary to manage a specific entity or aggregate. Each component has its flexible internal architecture that can include various layers such as hooks, services, types, and user interface. This approach ensures that components can be developed, tested, and maintained in isolation, reducing dependencies between different parts of the application.

For example, the **_ui_** folder of a component contains the part specific to managing the user interface, while the **_services_** folder includes the logic for data access and API calls. The **_hooks_** folder manages the component’s state and business logic, and the **_types_** folder defines the types and interfaces to ensure the correct typing of data. In this way, each component remains focused on its own responsibility, respecting the Single Responsibility Principle and facilitating reusability in different parts of the application.

**Separation of Concerns**:

The separation between business logic, presentation, and state management is clearly defined. For example, services in the **`services`** folder manage data access logic, while components in the **`ui`** folder handle the presentation.

**Custom Hooks**:

We use custom hooks to encapsulate fetching and state management logic. For example, hooks in the **`hooks`** folder contain the logic to manage the state of entities.

**Single Responsibility Principle**:

Each component and service is responsible for a single functionality or aggregate, in line with the Single Responsibility Principle.

**Service Layer Pattern**:

The data access logic is encapsulated in a service layer, clearly separating API calls from presentation logic. This approach facilitates the maintenance and updating of services without impacting the rest of the application. For example, **`get-users.ts`** handles API calls to fetch user data.

**Dependency Management Between Components**

Dependency injection is crucial for maintaining a modular and testable architecture. This approach allows components to receive external services as parameters, rather than creating them directly, making the code more flexible and easier to test.

###   

### **Principles of EventBus Communication**

EventBus communication offers several advantages:

*   **Decoupling**: Reduces rigid dependencies between components, making the code more modular.
*   **Testability**: Facilitates unit testing since dependencies can be easily replaced with mocks or stubs.
*   **Flexibility**: Allows changing the implementations of dependencies without modifying the component’s code.

  

#### **Use Case: Adapter Utilizing an Injected Dependency**

In our application, we use an EventBus to facilitate communication between the container and its components. This approach enables modularity and clear separation of concerns. Below is an example of how the EventBus is utilized for refreshing user data..

  

```typescript
// UsersContainer.tsx
import React from 'react';
import { Box, Toolbar } from '@mui/material';
import CustomButton from '@/ui/buttons/custom-button';
import { UsersList } from '@/users';
import { UserEvents, UserEventKeys } from '@/modules/users/events';
import { createEventBus } from '@/utils/event-bus';

const UsersContainer = ({ initialData, token }) => {
  // Create EventBus with a specific scope
  const userEventBus = createEventBus<UserEvents>('users-scope');

  const emitRefreshUsers = () => {
    userEventBus.emit(UserEventKeys.refreshUsers, undefined);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h1>Users List</h1>
        <Toolbar>
          <CustomButton variant="contained" color="primary" onClick={emitRefreshUsers}>
            Refresh
          </CustomButton>
        </Toolbar>
      </Box>
      <UsersList token={token} initialData={initialData} eventBus={userEventBus} />
    </Box>
  );
};

export default UsersContainer;
```

###   

**Handling Events in the Component**

The UsersList component listens for the refresh event emitted by the UsersContainer and refreshes the user data accordingly.

  

```typescript
// UsersList.tsx
import React, { useEffect, useState } from 'react';
import { User, UserEventKeys, UsersGrid } from '@/users';
import LoadingSpinner from '@/ui/loading-spinner';
import { EventBus } from '@/utils/event-bus';
import { UserEvents } from '../events';
import { useUsers } from '@/users';

const UsersList = ({ token, initialData, eventBus }) => {
  const { data, loading, error, refreshUsers } = useUsers(token);
  const [users, setUsers] = useState<User[]>(initialData);

  useEffect(() => {
    if (data.length > 0) {
      setUsers(data);
    }
  }, [data]);

  useEffect(() => {
    const handleRefreshUsers = () => {
      refreshUsers();
    };

    eventBus.on(UserEventKeys.refreshUsers, handleRefreshUsers);

    return () => {
      eventBus.off(UserEventKeys.refreshUsers, handleRefreshUsers);
    };
  }, [eventBus, refreshUsers]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {loading ? (
        <LoadingSpinner type="circular" color="primary" />
      ) : (
        <UsersGrid data={users} />
      )}
    </div>
  );
};

export default UsersList;
```

  

### **Custom Hook**

Custom hooks also receive services as parameters, ensuring that the logic for fetching and managing state can be tested independently.

```typescript
export const useUsers = (geoService: CountryFromCoordinates) => {
  const [data, setData] = useState<User[]>([]);  // State to hold user data
  const [loading, setLoading] = useState(false);  // State to manage loading status
  const [error, setError] = useState<string | null>(null);  // State to hold error messages

  /**
   * Function to refresh user data.
   * It sets the loading state, fetches the user data, and updates the states based on the result.
   */
  const refreshUsers = useCallback(async () => {
    setLoading(true);  // Set loading state to true
    setError(null);  // Reset error state
    const result = await getUsers(geoService)();  // Fetch user data
    if (isRight(result)) {
      setData(result.value);  // Update data state if fetching is successful
    } else {
      setError(result.value.message);  // Set error message if fetching fails
    }
    setLoading(false);  // Set loading state to false
  }, [geoService]);

  return { data, loading, error, refreshUsers };  // Return states and refresh function
```

### };

### **Test Example**

During tests, we can pass a mock implementation of the service to verify the component’s behavior.

```typescript
const mockGeoService = (lat: string, lon: string): TaskEither<Error, string> => {
  return taskEither(() =>
    Promise.resolve(
      lat === '-37.3159' && lon === '81.1496'
        ? right('Australia')
        : left(new Error('Country not found')),
    ),
  );
};

describe('UserService', () => {
  test('fetches and validates users', async () => {
    const result = await getUsers(mockGeoService)();
    expect(isRight(result)).toBe(true);

    if (isRight(result)) {
      const users = result.value;
      expect(users.length).toBe(1);
      expect(users[0].name).to be('Leanne Graham');
      expect(users[0].address.country).to be('Australia');
      expect(users[0].validated).to be(true);
    }
  });
});


```

###   

### **Real Implementation in the Page**

In the real case, the page passes the actual geolocation service when calling the user service.

```typescript
async function fetchInitialData(): Promise<User[]> {
  const result = await getUsers()();
  console.log('User page', 'fetchInitialData');
  const data = isRight(result) ? result.value : [];
  return data.slice(0, 8);
}
```

This way, dependency injection allows components to be more modular, easily testable, and flexible, improving the overall architecture of the application.

##   

## **Service Layer**

### **Introduction**

### **Definition and Purpose of the Service Layer**

The Service Layer is a layer in software architecture that handles business logic and communication with external resources, such as databases, external APIs, or other services. This layer is fundamental for maintaining a modular and easily maintainable architecture, separating data access logic and business logic from presentation and user interaction.

The Service Layer acts as an intermediary between the presentation layer and external resources, providing a consistent interface for performing business operations. This layer handles:

*   **Data Fetching**: Retrieving data from external sources such as APIs or databases.
*   **Data Adaptation**: Transforming raw data into a format usable by the application.
*   **Data Validation**: Ensuring the integrity and correctness of data before using or saving it.

###   

### **Implementation Example**

**`src/app/users/page.tsx`**

```typescript
import { getUsers } from '@/users/services/get-users';
import { ValidatedUser } from '@/users/types/user';
import { isRight } from '@/shared/utils/either';
import UsersScreen from '@/components/screens/users/users-screen';
import { getCountryFromCoordinates } from '@/components/geo/';

// Asynchronous function to fetch initial user data
async function fetchInitialData(): Promise<ValidatedUser[]> {
  const result = await getUsers()();
  console.log('User page', 'fetchInitialData');
  const data = isRight(result) ? result.value : [];
  return data.slice(0, 8); // Returns only the first 8 users for testing purposes
}

// Set the revalidation interval to 900 seconds (15 minutes)
export const revalidate = 900;

// Main page component
export default async function Page() {
  const initialData = await fetchInitialData();
  return <UsersScreen initialData={initialData} />;
}
```

  

## **Containers**

"Containers" are React components that represent the main pages or views of the application. They are responsible for orchestrating the presentation logic, managing local state, and coordinating interactions between child components.

The main responsibilities of "Containers" are:

1. **Orchestration of child components:** Containers compose various child components to create the complete user interface of the page or view. They determine which components should be displayed and how they should be arranged.
2. **Local state management:** Containers use or aggregate hooks from the respective modules to manage the local state of the page or view, such as the data to be displayed, the loading state, etc. These states are then passed to the child components as props. However, the Container will never handle internal logic or operate on module types.
3. **Coordination of interactions:** Containers coordinate interactions between child components, such as handling events, updating data, and communicating between components.
4. **Data fetching:** Often, Containers are responsible for fetching the data needed for the page or view, using a service layer to invoke APIs or using module hooks to invoke actions on the modules from the application context.
5. **Conditional rendering:** Containers do not handle conditional rendering of parts of the user interface based on the application state or available data, as they do not know the values defined in the module types.

  

### **Implementation Example**

  

**`src/components/containers/users/users-container.tsx`**

This component represents the main user page. It uses a custom hook, `useUsers`, to manage the state of user data, data loading, and errors, highlighting a clear separation of logic from the UI component. This hook also utilizes dependency injection, receiving `getCountryFromCoordinates` as a parameter to determine the country of users based on their coordinates, demonstrating a flexible and reusable approach in dependency management.

  

```typescript
// UsersContainer.tsx
import React from 'react';
import { Box, Toolbar } from '@mui/material';
import CustomButton from '@/ui/buttons/custom-button';
import { UsersList } from '@/users';
import { UserEvents, UserEventKeys } from '@/modules/users/events';
import { createEventBus } from '@/utils/event-bus';

const UsersContainer = ({ initialData, token }) => {
  // Create EventBus with a specific scope
  const userEventBus = createEventBus<UserEvents>('users-scope');

  const emitRefreshUsers = () => {
    userEventBus.emit(UserEventKeys.refreshUsers, undefined);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h1>Users List</h1>
        <Toolbar>
          <CustomButton variant="contained" color="primary" onClick={emitRefreshUsers}>
            Refresh
          </CustomButton>
        </Toolbar>
      </Box>
      <UsersList token={token} initialData={initialData} eventBus={userEventBus} />
    </Box>
  );
};

export default UsersContainer;
```

In this example, the UsersContainer component is responsible for:

*   Managing the local state of user data (`data`) and loading state (`loading`).
*   Coordinating the rendering of the `UserList` component by passing user data and loading state as props.
*   Handling the refresh event to update user data through the emitRefreshUsers function using the `EventBus`.
*   Orchestrating the user interface layout by placing the UserList component and the refresh button in the desired position.
*   

#### Important Note

The container should never directly manipulate types or perform business actions, but should only orchestrate. State management and business actions should be handled through hooks.

  

  

### **Build-Time Page Generation and Client-Side Updates**

In our project, we use a combination of build-time page generation and client-side updates to keep user data up-to-date. This approach allows us to benefit from both the performance of static generation and the flexibility of dynamic updates. Here is a detailed description of the mechanism used:

### **Build-Time Page Generation the "Page"**

User pages are generated at build time using Next.js. This means that when the site is built, user data is fetched once and used to generate the HTML page. To ensure that the data does not become outdated, we mention here that we use a revalidation mechanism that reloads the data periodically.

### **Code Example**

```typescript
async function fetchInitialData(): Promise<ValidatedUser[]> {
  const result = await getUsers()();
  console.log('User page', 'fetchInitialData');

  const data = isRight(result) ? result.value : [];
  return data.slice(0, 8); // only 8 users for testing
}

// Set the revalidation interval to 900 seconds (15 minutes)
export const revalidate = 900;

// Page component
export default async function Page() {
  const initialData = await fetchInitialData();
  return <UsersScreen initialData={initialData} />;
}
```

###   

### **Client-Side Updates**

For dynamic data updates, we use a combination of **`useState`**, **`useEffect`**, and **`useCallback`** in a custom hook called **`useUsers`**. This allows us to keep the data updated on the client and reflect any changes in real-time.

  

### **Description of the Mechanism**

1. **Build-Time Page Generation**: User pages are generated at build time, using data fetched once and stored in static HTML.
2. **Revalidation**: Data is reloaded periodically (every 15 minutes) to ensure it does not become outdated.
3. **Client-Side Updates**: We use a custom hook (**`useUsers`**) to manage the client-side data state and update the UI in real-time.

  

### **Revalidation**

In our project, we use a revalidation mechanism to ensure that user data is regularly updated. This is particularly useful for keeping the data synchronized without requiring manual requests. The revalidation is set to occur every 15 minutes (900 seconds).

To configure this, we have implemented the following in our code:

```cpp
export const revalidate = 900; // Revalidate every 15 minutes
```

Additionally, we specify the Node.js runtime environment in our **`next.config.mjs`** file to ensure that our server-side code runs efficiently. This configuration is necessary for the revalidation to work properly in a server-side context:

```typescript
/** @type {import('next').NextConfig} */const nextConfig = {
  const nextConfig = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    runtime: 'nodejs',
  },
```

By setting **`runtime: 'nodejs'`**, we ensure that our application leverages the Node.js runtime environment, which is optimized for server-side operations, including data fetching and revalidation. This configuration is crucial for maintaining performance and reliability in our data handling processes.

  

## Observability

For application observability, [Sentry](https://sentry.io/) has been chosen, a tool that allows for effective monitoring and management of logs, traces, and metrics. Here's how Sentry is integrated into the app's ecosystem:

*   **Logs**: Sentry automatically captures and organizes error logs generated by the application, including stack traces, error messages, and operational context. Logs can be enriched with custom messages and additional information using functions like `captureMessage` and `captureEvent`.
*   **Traces**: Sentry's traces allow for viewing a user's complete interaction with the application by tracking the chain of requests and responses between modules or internal components. This helps identify performance bottlenecks and isolate the origins of errors.
*   **Metrics**: Sentry supports the creation and monitoring of custom metrics that can help assess the application's performance. Metrics such as Web Vitals or other frontend performances can be tracked to obtain a detailed view of the application's behavior in production.

To ensure everything functions correctly, the organization and authentication token for Sentry are configured in the `.env` and `.env.local` files of the application, specifying the `NEXT_PUBLIC_SENTRY_ORG` variable and the `SENTRY_AUTH_TOKEN` in the `.env.sentry-build-plugin` file. Moreover, with Sentry, it is possible to automatically direct errors to different projects depending on the module.

  

### **License**

This project is licensed under the MIT License. For more details, see the LICENSE file.
