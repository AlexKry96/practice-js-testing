import DB from './DB';

describe('DB class', () => {
    let db;

    beforeEach(() => {
        db = new DB();
    });

    describe('.insert()', () => {
        it('should insert data and assign incremental id', async () => {
            const result = await db.insert({ name: 'Test 1' });
            expect(result).toHaveProperty('id', 1);

            const result2 = await db.insert({ name: 'Test 2' });
            expect(result2.id).toBe(2);
        });

        it('should reject if id is not a number', async () => {
            await expect(db.insert({ id: 'abc', name: 'Invalid' }))
                .rejects.toBe('ID can be only number!');
        });

        it('should reject if id already exists', async () => {
            await db.insert({ id: 1, name: 'A' });
            await expect(db.insert({ id: 1, name: 'B' }))
                .rejects.toBe("ID can't be duplicated!");
        });
    });

    describe('.select()', () => {
        it('should return record by id', async () => {
            const inserted = await db.insert({ name: 'Item' });
            const selected = await db.select(inserted.id);
            expect(selected).toEqual(inserted);
        });

        it('should reject if id not found', async () => {
            await expect(db.select(999)).rejects.toBe('ID not found');
        });
    });

    describe('.remove()', () => {
        it('should remove record and resolve with success message', async () => {
            const { id } = await db.insert({ name: 'Delete me' });
            const result = await db.remove(id);
            expect(result).toBe('Item was remove!');

            const rows = await db.getRows();
            expect(rows).toHaveLength(0);
        });

        it('should reject if record does not exist', async () => {
            await expect(db.remove(123)).rejects.toBe('Item not exist!');
        });
    });

    describe('.update()', () => {
        it('should update existing record', async () => {
            const { id } = await db.insert({ name: 'Old' });
            const updated = await db.update({ id, name: 'New' });
            expect(updated.name).toBe('New');
        });

        it('should reject if data has no id', async () => {
            await expect(db.update({ name: 'No ID' }))
                .rejects.toBe('ID have to be set!');
        });

        it('should reject if id does not exist', async () => {
            await expect(db.update({ id: 999, name: 'Ghost' }))
                .rejects.toBe('ID not found!');
        });
    });

    describe('.truncate()', () => {
        it('should clear all records and resolve true', async () => {
            await db.insert({ name: 'A' });
            await db.insert({ name: 'B' });
            const result = await db.truncate();
            expect(result).toBe(true);

            const rows = await db.getRows();
            expect(rows).toHaveLength(0);
        });
    });

    describe('.getRows()', () => {
        it('should return all rows', async () => {
            const data1 = await db.insert({ name: 'One' });
            const data2 = await db.insert({ name: 'Two' });
            const rows = await db.getRows();

            expect(rows).toEqual([data1, data2]);
        });
    });
});