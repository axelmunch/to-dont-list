class LocalDatabaseService<T> {
  private databaseName: string;
  private storeName: string;

  private database: IDBDatabase | null = null;
  private initPromise: Promise<void>;

  constructor(name: string, key: string = 'id') {
    this.databaseName = name;
    this.storeName = name;

    this.initPromise = this.initDatabase(key);
  }

  private initDatabase(key: string) {
    return new Promise<void>((resolve, reject) => {
      if (typeof window === 'undefined' || !('indexedDB' in window)) {
        // Can't use IndexedDB
        resolve();
      }

      const request = indexedDB.open(this.databaseName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore(this.storeName, {
          keyPath: key,
        });
      };

      request.onsuccess = (event) => {
        this.database = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = (event) => {
        reject(`Error opening IndexedDB: ${event}`);
      };
    });
  }

  public getAll(): Promise<T[]> {
    return this.initPromise.then(() => {
      return new Promise((resolve, reject) => {
        if (!this.database) {
          reject('Database not initialized');
          return;
        }

        const transaction = this.database.transaction(
          this.storeName,
          'readonly'
        );
        const objectStore = transaction.objectStore(this.storeName);

        const request = objectStore.getAll();

        request.onsuccess = () => {
          // Sort by creation date
          request.result.sort((a, b) =>
            new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
              ? 1
              : -1
          );

          resolve(request.result);
        };

        request.onerror = (event) => {
          reject(`Error getting all: ${event}`);
        };
      });
    });
  }

  public get(id: number): Promise<T | undefined> {
    return this.initPromise.then(() => {
      return new Promise((resolve, reject) => {
        if (!this.database) {
          reject('Database not initialized');
          return;
        }

        const transaction = this.database.transaction(
          this.storeName,
          'readonly'
        );
        const objectStore = transaction.objectStore(this.storeName);

        const request = objectStore.get(id);

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = (event) => {
          reject(`Error getting: ${event}`);
        };
      });
    });
  }

  public addMultiple(elements: T[]): Promise<void> {
    return this.initPromise.then(() => {
      return new Promise((resolve, reject) => {
        if (!this.database) {
          reject('Database not initialized');
          return;
        }

        const transaction = this.database.transaction(
          this.storeName,
          'readwrite'
        );
        const objectStore = transaction.objectStore(this.storeName);

        for (const element of elements) {
          objectStore.add(element);
        }

        transaction.oncomplete = () => {
          resolve();
        };

        transaction.onerror = (event) => {
          reject(`Error adding: ${event}`);
        };
      });
    });
  }

  public add(element: T): Promise<void> {
    return this.initPromise.then(() => {
      return new Promise((resolve, reject) => {
        if (!this.database) {
          reject('Database not initialized');
          return;
        }

        const transaction = this.database.transaction(
          this.storeName,
          'readwrite'
        );
        const objectStore = transaction.objectStore(this.storeName);

        const request = objectStore.add(element);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = (event) => {
          reject(`Error adding: ${event}`);
        };
      });
    });
  }

  public updateMultiple(elements: T[]): Promise<void> {
    return this.initPromise.then(() => {
      return new Promise((resolve, reject) => {
        if (!this.database) {
          reject('Database not initialized');
          return;
        }

        const transaction = this.database.transaction(
          this.storeName,
          'readwrite'
        );
        const objectStore = transaction.objectStore(this.storeName);

        for (const element of elements) {
          objectStore.put(element);
        }

        transaction.oncomplete = () => {
          resolve();
        };

        transaction.onerror = (event) => {
          reject(`Error updating: ${event}`);
        };
      });
    });
  }

  public update(element: T): Promise<void> {
    return this.initPromise.then(() => {
      return new Promise((resolve, reject) => {
        if (!this.database) {
          reject('Database not initialized');
          return;
        }

        const transaction = this.database.transaction(
          this.storeName,
          'readwrite'
        );
        const objectStore = transaction.objectStore(this.storeName);

        const request = objectStore.put(element);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = (event) => {
          reject(`Error updating: ${event}`);
        };
      });
    });
  }

  public delete(id: number): Promise<void> {
    return this.initPromise.then(() => {
      return new Promise((resolve, reject) => {
        if (!this.database) {
          reject('Database not initialized');
          return;
        }

        const transaction = this.database.transaction(
          this.storeName,
          'readwrite'
        );
        const objectStore = transaction.objectStore(this.storeName);

        const request = objectStore.delete(id);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = (event) => {
          reject(`Error deleting: ${event}`);
        };
      });
    });
  }

  public deleteMultiple(ids: number[]): Promise<void> {
    return this.initPromise.then(() => {
      return new Promise((resolve, reject) => {
        if (!this.database) {
          reject('Database not initialized');
          return;
        }

        const transaction = this.database.transaction(
          this.storeName,
          'readwrite'
        );
        const objectStore = transaction.objectStore(this.storeName);

        for (const id of ids) {
          objectStore.delete(id);
        }

        transaction.oncomplete = () => {
          resolve();
        };

        transaction.onerror = (event) => {
          reject(`Error deleting: ${event}`);
        };
      });
    });
  }

  public deleteAll(): Promise<void> {
    return this.initPromise.then(() => {
      return new Promise((resolve, reject) => {
        if (!this.database) {
          reject('Database not initialized');
          return;
        }

        const transaction = this.database.transaction(
          this.storeName,
          'readwrite'
        );
        const objectStore = transaction.objectStore(this.storeName);

        const request = objectStore.clear();

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = (event) => {
          reject(`Error deleting all: ${event}`);
        };
      });
    });
  }
}

export default LocalDatabaseService;
