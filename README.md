# Modular design front-end app

A modular and scalable front-end application example developed using a component-driven approach. The project leverages React for UI management, TypeScript for functional business logic, and Next.js 14 for server-side rendering and routing. It incorporates principles of modular architecture to ensure maintainability and testability of the codebase.

### **Technologies Used**

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: A language that adds static types to JavaScript, improving code reliability.
- **Next.js 14**: A React framework for server-side rendering and routing.
- **Modular Architecture**: An approach that separates concerns and facilitates code maintainability and scalability.

### **Architectural Principles**

- **Component-Driven Development**: Development is based on autonomous, reusable, and testable components.
- **Component-Based Design**: Each component is designed to be autonomous and independent, encapsulating logic, state, and user interface.
- **Separation of Concerns**: Clear separation between business logic, presentation, and state management.
- **Single Responsibility Principle**: Each component and service is responsible for a single functionality or aggregate.
- **Service Layer Pattern**: Encapsulates data access logic in a separate layer, promoting maintainability and scalability.
- **Container Components**: Components responsible for fetching data and passing it to presentational components.

### **Code Structure**

- **components**: Contains user interface components, each with its own hooks, business logic, and adapters.
- **shared**: Contains reusable components and utilities across the project.
- **utils**: Includes generic helper functions such as **`fetchData`**, **`either`**, and **`taskEither`**.

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ModularDesignApp.git
   ```

2. Install dependencies:

   ```bash
   cd ModularDesignApp
   pnpm i
   ```

3. Start the application:

   ```bash
   pnpm run dev
   ```

### **Contributing**

If you wish to contribute to the project, you are welcome! Follow these guidelines to ensure your contribution aligns with the project's goals.

1. Fork the repository.
2. Create a branch for your feature or fix:

   ```bash
   git checkout -b feature/feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m 'Add new feature'
   ```

4. Push the branch:

   ```bash
   git push origin feature/feature-names
   ```

5. Open a Pull Request.

## **Component Structure**

In our project, we adopt a modular approach where each component handles a single entity or aggregate. Each component has its flexible internal architecture, adaptable to specific needs.

A component in our project can include various layers such as **`ui`**, **`hooks`**, **`services`**, and **`types`**. However, not all components must necessarily have all these layers. For example, a component might not have a **`ui`** folder if it doesn't require its own user interface, or it might not have a **`services`** folder if it doesn't need direct access to external data. In such cases, data can be passed directly via props from other components.

### **Example Component Structure**

1. **src/components**:
   - **(component name)**:
     - **hooks**:
       - Contains custom hooks for managing the component's state and business logic.
     - **services**:
       - Includes services to fetch, adapt, and validate the component's data. These services handle communication with external APIs and other data sources.
     - **types**:
       - Definitions of types and interfaces to correctly type the component's data.
     - **ui**:
       - Contains user interface components for displaying and interacting with the component's data.
2. **src/shared**:
   - **components**:
     - Contains shared and generic components such as error messages and loading spinners that can be used across various parts of the application.

### **Design Patterns Used**

**Component-Based Design**:

In this mini project, we adopt a Component-Based Design approach. Each component is designed to be autonomous and independent. Components are reusable units that encapsulate the logic, state, and user interface necessary to manage a specific entity or aggregate. Each component has its flexible internal architecture that can include various layers such as hooks, services, types, and user interface. This approach ensures that components can be developed, tested, and maintained in isolation, reducing dependencies between different parts of the application.

For example, the **_ui_** folder of a component contains the part specific to managing the user interface, while the **_services_** folder includes the logic for data access and API calls. The **_hooks_** folder manages the component's state and business logic, and the **_types_** folder defines the types and interfaces to ensure the correct typing of data. In this way, each component remains focused on its own responsibility, respecting the Single Responsibility Principle and facilitating reusability in different parts of the application.

**Separation of Concerns**:

The separation between business logic, presentation, and state management is clearly defined. For example, services in the **`services`** folder manage data access logic, while components in the **`ui`** folder handle the presentation.

**Custom Hooks**:

We use custom hooks to encapsulate fetching and state management logic. For example, hooks in the **`hooks`** folder contain the logic to manage the state of entities.

**Single Responsibility Principle**:

Each component and service is responsible for a single functionality or aggregate, in line with the Single Responsibility Principle.

**Service Layer Pattern**:

The data access logic is encapsulated in a service layer, clearly separating API calls from presentation logic. This approach facilitates the maintenance and updating of services without impacting the rest of the application. For example, **`get-users.ts`** handles API calls to fetch user data.

### **Implementation Example**

**Users**

- **src/components/users/hooks**:
  - **`use-users.ts`**: Custom hook to manage user state.
- **src/components/users/services**:
  - **`get-users.ts`**: Service to fetch user data.
  - **`user-adapter.ts`**: Adapter for user data.
  - **`user-validator.ts`**: Validator for user data.
- **src/components/users/types**:
  - **`user.ts`**: Type definitions for users.
- **src/components/users/ui**:
  - **`user-components.tsx`**: UI components for managing users.
  - **`users-screen.tsx`**: Main screen for displaying users.

**Dependency Management Between Components**

Dependency injection is crucial for maintaining a modular and testable architecture. This approach allows components to receive external services as parameters, rather than creating them directly, making the code more flexible and easier to test.

### **Principles of Dependency Injection**

Dependency injection offers several advantages:

- **Decoupling**: Reduces rigid dependencies between components, making the code more modular.
- **Testability**: Facilitates unit testing since dependencies can be easily replaced with mocks or stubs.
- **Flexibility**: Allows changing the implementations of dependencies without modifying the component's code.

### **Use Case: Adapter Utilizing an Injected Dependency**

In our application, we use dependency injection to adapt user data with geographic information. The user adapter accepts an external service function as a parameter, which is used to fetch the country from geographic coordinates.

### **Adapter Implementation**

```tsx
const adaptUser = async (
  input: any,
  geoService: (lat: string, lon: string) => TaskEither<Error, string>,
): Promise<Either<Error, User>> => {
  const countryResult = await geoService(
    input.address.geo.lat,
    input.address.geo.lng,
  )();
  const user: User = {
    id: input.id,
    name: input.name,
    username: input.username,
    email: input.email,
    address: {
      street: input.address.street,
      city: input.address.city,
      zipcode: input.address.zipcode,
      country: isRight(countryResult) ? countryResult.value : undefined,
    },
    phone: input.phone,
    website: ensureHttp(input.website),
  };
  return right(user);
};

export const userAdapter = (
  input: any,
  geoService: (lat: string, lon: string) => TaskEither<Error, string>,
): TaskEither<Error, User> => {
  return taskEither(() => adaptUser(input, geoService));
};
```

### **Custom Hook**

Custom hooks also receive services as parameters, ensuring that the logic for fetching and managing state can be tested independently.

```tsx
export const useUsers = (
  geoService: (lat: string, lon: string) => TaskEither<Error, string>,
): UserState & { fetchData: () => void } => {
  const [state, setState] = useState<UserState>({
    loading: true,
    error: null,
    data: null,
  });

  const fetchData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    const result = await getUsers(geoService)();

    if (isLeft(result)) {
      setState({ loading: false, error: result.value.message, data: null });
    } else if (isRight(result)) {
      setState({ loading: false, error: null, data: result.value });
    }
  }, [geoService]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, fetchData };
};
```

### **Test Example**

During tests, we can pass a mock implementation of the service to verify the component's behavior.

```tsx

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

### **Real Implementation in the Page**

In the real case, the page passes the actual geolocation service when calling the user service.

```tsx
async function fetchInitialData(): Promise<ValidatedUser[]> {
  const result = await getUsers(getCountryFromCoordinates)();
  console.log('User page', 'fetchInitialData');
  const data = isRight(result) ? result.value : [];
  return data.slice(0, 8);
}
```

This way, dependency injection allows components to be more modular, easily testable, and flexible, improving the overall architecture of the application.

## **Service Layer**

### **Introduction**

### **Definition and Purpose of the Service Layer**

The Service Layer is a layer in software architecture that handles business logic and communication with external resources, such as databases, external APIs, or other services. This layer is fundamental for maintaining a modular and easily maintainable architecture, separating data access logic and business logic from presentation and user interaction.

The Service Layer acts as an intermediary between the presentation layer and external resources, providing a consistent interface for performing business operations. This layer handles:

- **Data Fetching**: Retrieving data from external sources such as APIs or databases.
- **Data Adaptation**: Transforming raw data into a format usable by the application.
- **Data Validation**: Ensuring the integrity and correctness of data before using or saving it.

### **Screens**

"Screens" are React components that represent the main pages or views of the application. They are responsible for orchestrating the presentation logic, managing local state, and coordinating interactions between child components.

The main responsibilities of "Screens" are:

- **Orchestration of child components**: Screens compose various child components to create the complete user interface of the page or view. They determine which components should be displayed and how they should be arranged.
- **Local state management**: Screens manage the local state of the page or view, such as the data to be displayed, the loading state, etc. These states are then passed to the child components as props.
- **Coordination of interactions**: Screens coordinate interactions between child components, such as handling events, updating data, and communicating between components.
- **Data fetching**: Often, Screens are responsible for fetching the data needed for the page or view, such as invoking APIs or reading data from the application context.
- **Conditional rendering**: Screens can handle the conditional rendering of certain parts of the user interface based on the application state or available data.

### **Implementation Example**

**`src/app/users/page.tsx`**

```tsx
import { getUsers } from '@/users/services/get-users';
import { ValidatedUser } from '@/users/types/user';
import { isRight } from '@/shared/utils/either';
import UsersScreen from '@/components/screens/users/users-screen';
import { getCountryFromCoordinates } from '@/components/geo/';

// Asynchronous function to fetch initial user data
async function fetchInitialData(): Promise<ValidatedUser[]> {
  const result = await getUsers(getCountryFromCoordinates)();
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

**`src/components/screens/users/users-screen.tsx`**

This component represents the main users' page. It manages the state of user data, data loading, and coordinates the child components to display the user list.

```tsx
'use client';

import React, { useState } from 'react';
import { getUsers } from '@/users/services/get-users';
import { ValidatedUser } from '@/users/types/user';
import { isRight } from '@/shared/utils/either';
import UserList from '@/components/users/ui/UserList';
import { Box, Toolbar, Button } from '@mui/material';
import { getCountryFromCoordinates } from '@/components/geo/service/get-service';

export type UsersPageProps = {
  initialData: ValidatedUser[];
};

const UsersScreen = ({ initialData }: UsersPageProps) => {
  const [data, setData] = useState<ValidatedUser[]>(initialData);
  const [loading, setLoading] = useState(false);

  // Function to refresh user data
  const handleRefresh = async () => {
    setLoading(true);
    const result = await getUsers(getCountryFromCoordinates)();
    if (isRight(result)) {
      setData(result.value);
    }
    setLoading(false);
  };

  return (
    <div>
      <UserList data={data} loading={loading} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Toolbar>
          <Button variant="contained" color="primary" onClick={handleRefresh}>
            Refresh
          </Button>
        </Toolbar>
      </Box>
    </div>
  );
};

export default UsersScreen;
```

In this example, the **`UsersScreen`** component is responsible for:

- Managing the local state of user data (**`data`**) and loading state (**`loading`**).
- Coordinating the rendering of the **`UserList`** component by passing user data and loading state as props.
- Handling the refresh event to update user data through the **`handleRefresh`** function.
- Orchestrating the user interface layout by placing the **`UserList`** component and the refresh button in the desired position.

### **Build-Time Page Generation and Client-Side Updates**

In our project, we use a combination of build-time page generation and client-side updates to keep user data up-to-date. This approach allows us to benefit from both the performance of static generation and the flexibility of dynamic updates. Here is a detailed description of the mechanism used:

### **Build-Time Page Generation**

User pages are generated at build time using Next.js. This means that when the site is built, user data is fetched once and used to generate the HTML page. To ensure that the data does not become outdated, we mention here that we use a revalidation mechanism that reloads the data periodically.

### **Code Example**

```tsx
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

### **Client-Side Updates**

For dynamic data updates, we use a combination of **`useState`**, **`useEffect`**, and **`useCallback`** in a custom hook called **`useUsers`**. This allows us to keep the data updated on the client and reflect any changes in real-time.

### **Code Example**

```tsx
type UserState = {
  loading: boolean;
  error: string | null;
  data: ValidatedUser[] | null;
};

export const useUsers = (): UserState & { fetchData: () => void } => {
  const [state, setState] = useState<UserState>({
    loading: true,
    error: null,
    data: null,
  });

  const fetchData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    const result = await getUsers()();

    if (isLeft(result)) {
      setState({ loading: false, error: result.value.message, data: null });
    } else if (isRight(result)) {
      setState({ loading: false, error: null, data: result.value });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, fetchData };
};
```

### **Description of the Mechanism**

1. **Build-Time Page Generation**: User pages are generated at build time, using data fetched once and stored in static HTML.
2. **Revalidation**: Data is reloaded periodically (every 15 minutes) to ensure it does not become outdated.
3. **Client-Side Updates**: We use a custom hook (**`useUsers`**) to manage the client-side data state and update the UI in real-time.

### **Revalidation**

In our project, we use a revalidation mechanism to ensure that user data is regularly updated. This is particularly useful for keeping the data synchronized without requiring manual requests. The revalidation is set to occur every 15 minutes (900 seconds).

To configure this, we have implemented the following in our code:

```tsx
export const revalidate = 900; // Revalidate every 15 minutes
```

Additionally, we specify the Node.js runtime environment in our **`next.config.mjs`** file to ensure that our server-side code runs efficiently. This configuration is necessary for the revalidation to work properly in a server-side context:

```jsx
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    runtime: 'nodejs',
  },
};

export default nextConfig;
```

By setting **`runtime: 'nodejs'`**, we ensure that our application leverages the Node.js runtime environment, which is optimized for server-side operations, including data fetching and revalidation. This configuration is crucial for maintaining performance and reliability in our data handling processes.

### **License**

This project is licensed under the MIT License. For more details, see the LICENSE file.
