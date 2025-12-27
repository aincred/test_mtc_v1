// // // import sql from 'mssql';

// // // // ==========================================
// // // // 1. TYPE DEFINITIONS
// // // // ==========================================

// // // export interface ChildData {
// // //   SamNo: string;
// // //   MTCCode: string; 
// // //   AtId: number;
// // //   RefererId: number;
// // //   ChildName: string;
// // //   MotherName: string;
// // //   FatherName: string;
// // //   MobileNumber: string;
// // //   BPLNo?: string;
// // //   DateofBirth: string | Date;
// // //   GenderId: number;
// // //   CastId: number;
// // //   Address: string;
// // //   DistrictId: string | number;
// // //   BlockId: string | number;
// // //   ICDSId: string | number;
// // //   AnganwadiId: string | number;
// // //   VillageName: string;
// // //   AdmissionDate: string | Date;
// // //   AdmissionWeight: number;
// // //   AdmissionHeight: number;
// // //   AdmissionZScore: number;
// // //   AdmissionEdema: number;
// // //   AdmissionMuac: number;
// // //   AdmissionAppetite: number;
// // //   BreastFeeding: number;
// // //   ComplementaryFeeding: number;
// // //   MedicalComplication?: string;
// // //   RegistrationImage?: string;
// // // }

// // // export interface DailyWeightData {
// // //   Rid: number;
// // //   SamNo: string;
// // //   MTCCode: string;
// // //   [key: string]: any; 
// // // }

// // // export interface DischargeData {
// // //   SamNo: string;
// // //   DischargeDate: string | Date;
// // //   DischargeWeight: number;
// // //   DischargeHeight: number;
// // //   DischargeMuac: number;
// // //   DischargeEdema: number;
// // //   ExitIndicator: number;
// // //   IFAToMotherTablet: number;
// // //   MotherWages: number;
// // //   IFAToMotherSyrup: number;
// // //   // Optional fields (if columns exist in DB, uncomment in SQL query)
// // //   HemoglobinMother?: number;
// // //   DischargeImage?: string | null;
// // //   TotalStay?: number | null;
// // //   MinimumWeight?: number | null;
// // // }

// // // // NEW: Follow Up Interface based on your Schema
// // // export interface FollowUpData {
// // //   Rid?: number;
// // //   SamNo: string;
// // //   MTCCode?: string;
// // //   MotherName?: string;
// // //   DischargeDate?: string | Date;

// // //   // First Follow Up
// // //   FirstFollowUpDate?: string | Date;
// // //   FirstFollowUpDoneOn?: string | Date;
// // //   FirstFollowUpWeight?: number;
// // //   FirstFollowUpHeight?: number;
// // //   FirstFollowUpMUAC?: number;
// // //   FirstFollowUpZscore?: number;
// // //   FirstFollowUpMotherBP?: string;
// // //   FirstFollowUpMotherWeight?: number;
// // //   FirstFollowUpMotherHB?: number;

// // //   // Second Follow Up
// // //   SecondFollowUpDate?: string | Date;
// // //   SecondFollowUpDoneOn?: string | Date;
// // //   SecondFollowUpWeight?: number;
// // //   SecondFollowUpHeight?: number;
// // //   SecondFollowUpMUAC?: number;
// // //   SecondFollowUpZscore?: number;
// // //   SecondFollowUpMotherBP?: string;
// // //   SecondFollowUpMotherWeight?: number;
// // //   SecondFollowUpMotherHB?: number;

// // //   // Third Follow Up
// // //   ThirdFollowUpDate?: string | Date;
// // //   ThirdFollowUpDoneOn?: string | Date;
// // //   ThirdFollowUpWeight?: number;
// // //   ThirdFollowUpHeight?: number;
// // //   ThirdFollowUpMUAC?: number;
// // //   ThirdFollowUpZscore?: number;
// // //   ThirdFollowUpMotherBP?: string;
// // //   ThirdFollowUpMotherWeight?: number;
// // //   ThirdFollowUpMotherHB?: number;

// // //   // Fourth Follow Up (Matches "Fourt" spelling in DB)
// // //   FourthFollowUpDate?: string | Date;
// // //   FourtFollowUpDoneOn?: string | Date;
// // //   FourtFollowUpWeight?: number;
// // //   FourtFollowUpHeight?: number;
// // //   FourtFollowUpMUAC?: number;
// // //   FourtFollowUpZscore?: number;
// // //   FourtFollowUpMotherBP?: string;
// // //   FourtFollowUpMotherWeight?: number;
// // //   FourtFollowUpMotherHB?: number;
// // // }

// // // export interface DischargeListChild {
// // //   SamNo: string;
// // //   MTCCode: string;
// // //   ChildName: string;
// // //   FatherName: string;
// // //   MotherName: string;
// // //   DateofBirth: string | Date;
// // //   AdmissionWeight: number;
// // //   AdmissionHeight: number;
// // //   AdmissionDate: string | Date;
// // // }

// // // // ==========================================
// // // // 2. DB CONFIGURATION
// // // // ==========================================

// // // const config: sql.config = {
// // //   user: process.env.DB_USER!,
// // //   password: process.env.DB_PASSWORD!,
// // //   server: process.env.DB_SERVER!,
// // //   port: parseInt(process.env.DB_PORT || '1433'),
// // //   database: process.env.DB_NAME!,
// // //   options: {
// // //     encrypt: false,
// // //     trustServerCertificate: true,
// // //     enableArithAbort: true,
// // //   },
// // //   pool: {
// // //     max: 10,
// // //     min: 0,
// // //     idleTimeoutMillis: 30000
// // //   }
// // // };

// // // // ==========================================
// // // // 3. SINGLETON CONNECTION POOL
// // // // ==========================================

// // // let pool: sql.ConnectionPool | null = null;

// // // export async function getDBConnection() {
// // //   try {
// // //     if (pool && pool.connected) {
// // //       return pool;
// // //     }
// // //     pool = await sql.connect(config);
// // //     return pool;
// // //   } catch (err) {
// // //     console.error('❌ Database Connection Failed:', err);
// // //     throw err;
// // //   }
// // // }

// // // // ==========================================
// // // // 4. HELPER UTILS
// // // // ==========================================

// // // const parseSafeInt = (val: any): number | null => {
// // //   if (!val) return null;
// // //   if (typeof val === 'number') return val;
// // //   const parsed = parseInt(val, 10);
// // //   return isNaN(parsed) ? null : parsed;
// // // };

// // // // ==========================================
// // // // 5. FETCH FUNCTIONS (CORE DATA)
// // // // ==========================================

// // // export async function getChildrenFromDB() {
// // //   try {
// // //     const db = await getDBConnection();
// // //     const result = await db.request().query(`
// // //       SELECT 
// // //         SamNo, MTCCode, ChildName, MotherName, FatherName, 
// // //         MobileNumber, DateofBirth, AdmissionDate, AdmissionWeight, 
// // //         AdmissionHeight, DistrictId, BlockId, VillageName
// // //       FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
// // //       ORDER BY AdmissionDate DESC
// // //     `);
// // //     return result.recordset;
// // //   } catch (err) {
// // //     console.error('❌ Fetch Children Error:', err);
// // //     throw err;
// // //   }
// // // }

// // // // NEW: Fetch List of Children who are NOT yet discharged
// // // export async function getDischargeList() {
// // //   try {
// // //     const db = await getDBConnection();
// // //     // We filter by DischargeDate IS NULL to only show currently admitted children
// // //     const query = `
// // //       SELECT 
// // //         SamNo, 
// // //         MTCCode, 
// // //         ChildName, 
// // //         FatherName, 
// // //         MotherName, 
// // //         DateofBirth, 
// // //         AdmissionWeight, 
// // //         AdmissionHeight, 
// // //         AdmissionDate
// // //       FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
// // //       WHERE DischargeDate IS NULL
// // //       ORDER BY AdmissionDate DESC
// // //     `;
// // //     const result = await db.request().query(query);
// // //     return result.recordset as DischargeListChild[];
// // //   } catch (err) {
// // //     console.error('❌ Error fetching discharge list:', err);
// // //     throw err;
// // //   }
// // // }

// // // export async function getDailyWeights(samNo: string) {
// // //   try {
// // //     const db = await getDBConnection();
// // //     const result = await db.request()
// // //       .input('SamNo', sql.NVarChar, samNo)
// // //       .query(`
// // //         SELECT * FROM [MTCJharkhand].[dbo].[MTCSAMDailyWeight] 
// // //         WHERE SamNo = @SamNo
// // //       `);
    
// // //     return result.recordset[0] || null;
// // //   } catch (err) {
// // //     console.error('❌ Fetch Weight Error:', err);
// // //     throw err;
// // //   }
// // // }

// // // export async function getChildBySamNo(samNo: string) {
// // //   try {
// // //     const db = await getDBConnection();
// // //     const result = await db.request()
// // //       .input('SamNo', sql.NVarChar, samNo)
// // //       .query(`
// // //         SELECT TOP 1 
// // //           SamNo, MTCCode, ChildName, MotherName, FatherName, 
// // //           AdmissionWeight, AdmissionHeight, AdmissionMuac, 
// // //           AdmissionEdema, AdmissionDate, DateofBirth
// // //         FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
// // //         WHERE SamNo = @SamNo
// // //       `);
// // //     return result.recordset[0] || null;
// // //   } catch (err) {
// // //     console.error('❌ Error fetching child:', err);
// // //     throw err;
// // //   }
// // // }

// // // // NEW: Fetch FollowUp Data
// // // export async function getFollowUpData(samNo: string) {
// // //   try {
// // //     const db = await getDBConnection();
// // //     const result = await db.request()
// // //       .input('SamNo', sql.NVarChar, samNo)
// // //       .query(`
// // //         SELECT TOP 1 * FROM [MTCJharkhand].[dbo].[MTCFollowUp] 
// // //         WHERE SamNo = @SamNo
// // //       `);
// // //     return result.recordset[0] as FollowUpData || null;
// // //   } catch (err) {
// // //     console.error('❌ Error fetching FollowUp data:', err);
// // //     throw err;
// // //   }
// // // }

// // // // ==========================================
// // // // 6. REFERENCE DATA FETCHERS (DROPDOWNS)
// // // // ==========================================

// // // export async function getGenderList() {
// // //   try {
// // //     const db = await getDBConnection();
// // //     const result = await db.request().query(`SELECT [GenderId], [GenderName] FROM [MTCJharkhand].[dbo].[MTCGender]`);
// // //     return result.recordset;
// // //   } catch (err) { console.error('Error fetching Genders', err); throw err; }
// // // }

// // // export async function getCastList() {
// // //   try {
// // //     const db = await getDBConnection();
// // //     const result = await db.request().query(`SELECT [CastId], [CastName] FROM [MTCJharkhand].[dbo].[MTCCasts]`);
// // //     return result.recordset;
// // //   } catch (err) { console.error('Error fetching Casts', err); throw err; }
// // // }

// // // export async function getDistrictList() {
// // //   try {
// // //     const db = await getDBConnection();
// // //     const result = await db.request().query(`SELECT [DistrictId], [DistrictCode], [DistrictName] FROM [MTCJharkhand].[dbo].[MTCDistricts] ORDER BY [DistrictName] ASC`);
// // //     return result.recordset;
// // //   } catch (err) { console.error('Error fetching Districts', err); throw err; }
// // // }

// // // export async function getBlockList(districtId?: number | string) {
// // //   try {
// // //     const db = await getDBConnection();
// // //     let query = `SELECT [BlockId], [BlockName], [DistrictId] FROM [MTCJharkhand].[dbo].[MTCBlock]`;
// // //     const request = db.request();
// // //     if (districtId) {
// // //       query += ` WHERE [DistrictId] = @DistrictId`;
// // //       request.input('DistrictId', sql.Int, districtId);
// // //     }
// // //     query += ` ORDER BY [BlockName] ASC`;
// // //     const result = await request.query(query);
// // //     return result.recordset;
// // //   } catch (err) { console.error('Error fetching Block List', err); throw err; }
// // // }

// // // export async function getICDSList(districtId?: number | string) {
// // //   try {
// // //     const db = await getDBConnection();
// // //     let query = `SELECT [ICDSId], [ICDSName], [DistrictId] FROM [MTCJharkhand].[dbo].[MTCIcds]`;
// // //     const request = db.request();
// // //     if (districtId) {
// // //       query += ` WHERE [DistrictId] = @DistrictId`;
// // //       request.input('DistrictId', sql.Int, districtId);
// // //     }
// // //     query += ` ORDER BY [ICDSName] ASC`;
// // //     const result = await request.query(query);
// // //     return result.recordset;
// // //   } catch (err) { console.error('Error fetching ICDS List', err); throw err; }
// // // }

// // // export async function getAnganwadiList(icdsId?: number | string) {
// // //   try {
// // //     const db = await getDBConnection();
// // //     let query = `SELECT [AnganwadiId], [AnganwadiName], [ICDSId] FROM [MTCJharkhand].[dbo].[MTCAnganwadi]`;
// // //     const request = db.request();
// // //     if (icdsId) {
// // //       query += ` WHERE [ICDSId] = @ICDSId`;
// // //       request.input('ICDSId', sql.Int, icdsId);
// // //     }
// // //     query += ` ORDER BY [AnganwadiName] ASC`;
// // //     const result = await request.query(query);
// // //     return result.recordset;
// // //   } catch (err) { console.error('Error fetching Anganwadi List', err); throw err; }
// // // }

// // // // ==========================================
// // // // 7. GENERATE NEXT SAM NUMBER
// // // // ==========================================

// // // export async function generateNextSamNumber() {
// // //   try {
// // //     const db = await getDBConnection();
    
// // //     // 1. Fetch Dynamic Prefix
// // //     const mtcResult = await db.request().query(`SELECT TOP 1 MTCCode FROM [MTCJharkhand].[dbo].[MTCCenter]`);
// // //     let mtcPrefix = "JH/WSB/CBS"; 
// // //     if (mtcResult.recordset.length > 0 && mtcResult.recordset[0].MTCCode) {
// // //        mtcPrefix = mtcResult.recordset[0].MTCCode;
// // //     }

// // //     // 2. Find last record
// // //     const searchPattern = `${mtcPrefix}/%`;
// // //     const result = await db.request()
// // //       .input('Pattern', sql.NVarChar, searchPattern)
// // //       .query(`
// // //         SELECT TOP 1 SamNo 
// // //         FROM [MTCJharkhand].[dbo].[MTCSAMChildren] 
// // //         WHERE SamNo LIKE @Pattern
// // //         ORDER BY LEN(SamNo) DESC, SamNo DESC
// // //       `);

// // //     const lastRecord = result.recordset[0];

// // //     // 3. Generate Number
// // //     if (!lastRecord || !lastRecord.SamNo) {
// // //       return `${mtcPrefix}/1001`;
// // //     }

// // //     const parts = lastRecord.SamNo.split('/');
// // //     const lastNumStr = parts[parts.length - 1]; 
// // //     const lastNum = parseInt(lastNumStr, 10);

// // //     if (isNaN(lastNum)) return `${mtcPrefix}/${Date.now().toString().slice(-4)}`; 

// // //     const nextNum = lastNum + 1;
// // //     return `${mtcPrefix}/${nextNum}`;

// // //   } catch (err) {
// // //     console.error('❌ Error generating SAM No:', err);
// // //     return `JH/ERROR/${Math.floor(Math.random() * 1000)}`; 
// // //   }
// // // }

// // // // ==========================================
// // // // 8. INSERT / UPDATE FUNCTIONS
// // // // ==========================================

// // // export async function updateDailyWeight(samNo: string, mtcCode: string, day: number, weight: number) {
// // //   try {
// // //     if (day < 0 || day > 59) throw new Error("Day must be between 0 and 59");

// // //     const db = await getDBConnection();
// // //     const checkRow = await db.request()
// // //       .input('SamNo', sql.NVarChar, samNo)
// // //       .query(`SELECT count(*) as count FROM [MTCJharkhand].[dbo].[MTCSAMDailyWeight] WHERE SamNo = @SamNo`);

// // //     const exists = checkRow.recordset[0].count > 0;
// // //     const dayColumn = `Day${day}`;

// // //     if (exists) {
// // //       await db.request()
// // //         .input('SamNo', sql.NVarChar, samNo)
// // //         .input('Weight', sql.Decimal(5, 2), weight)
// // //         .query(`UPDATE [MTCJharkhand].[dbo].[MTCSAMDailyWeight] SET ${dayColumn} = @Weight WHERE SamNo = @SamNo`);
// // //     } else {
// // //       await db.request()
// // //         .input('SamNo', sql.NVarChar, samNo)
// // //         .input('MTCCode', sql.NVarChar, mtcCode)
// // //         .input('Weight', sql.Decimal(5, 2), weight)
// // //         .query(`INSERT INTO [MTCJharkhand].[dbo].[MTCSAMDailyWeight] (SamNo, MTCCode, ${dayColumn}) VALUES (@SamNo, @MTCCode, @Weight)`);
// // //     }
// // //     return { success: true, message: `Updated ${dayColumn}` };
// // //   } catch (err) { console.error(`Error updating weight:`, err); throw err; }
// // // }

// // // export async function registerChildInDB(childData: ChildData) {
// // //   try {
// // //     const db = await getDBConnection();
    
// // //     // Fallback MTCCode logic
// // //     let realMTCCode = childData.MTCCode;
// // //     try {
// // //         const mtcQuery = await db.request().query(`SELECT TOP 1 MTCCode FROM [MTCJharkhand].[dbo].[MTCCenter]`);
// // //         if (mtcQuery.recordset.length > 0 && mtcQuery.recordset[0].MTCCode) {
// // //             realMTCCode = mtcQuery.recordset[0].MTCCode;
// // //         }
// // //     } catch(e) { console.warn("Using provided MTCCode as fallback."); }

// // //     const transaction = new sql.Transaction(db);
// // //     await transaction.begin();

// // //     try {
// // //       const request = new sql.Request(transaction);
// // //       const queryChildren = `
// // //         INSERT INTO [MTCJharkhand].[dbo].[MTCSAMChildren] (
// // //           SamNo, MTCCode, AtId, RefererId, ChildName, MotherName, FatherName, 
// // //           MobileNumber, BPLNo, DateofBirth, GenderId, CastId, Address, 
// // //           DistrictId, BlockId, ICDSId, AnganwadiId, VillageName, AdmissionDate, 
// // //           AdmissionWeight, AdmissionHeight, AdmissionZScore, AdmissionEdema, 
// // //           AdmissionMuac, AdmissionAppetite, BreastFeeding, ComplementaryFeeding, 
// // //           MedicalComplication, RegistrationImage, DischargeDate, DischargeWeight, 
// // //           DischargeHeight, DischargeEdema, DischargeMuac, DischargeZScore, 
// // //           ExitIndicator, IFAToMotherTablet, MotherWages, IFAToMotherSyrup, 
// // //           DischargeStatus, DischargeImage, MedicalTrasfer
// // //         )
// // //         VALUES (
// // //           @SamNo, @MTCCode, @AtId, @RefererId, @ChildName, @MotherName, @FatherName, 
// // //           @MobileNumber, @BPLNo, @DateofBirth, @GenderId, @CastId, @Address, 
// // //           @DistrictId, @BlockId, @ICDSId, @AnganwadiId, @VillageName, @AdmissionDate, 
// // //           @AdmissionWeight, @AdmissionHeight, @AdmissionZScore, @AdmissionEdema, 
// // //           @AdmissionMuac, @AdmissionAppetite, @BreastFeeding, @ComplementaryFeeding, 
// // //           @MedicalComplication, @RegistrationImage, NULL, NULL, 
// // //           NULL, NULL, NULL, NULL, 
// // //           NULL, NULL, NULL, NULL, 
// // //           NULL, NULL, NULL
// // //         )
// // //       `;

// // //       request.input('SamNo', sql.NVarChar, childData.SamNo);
// // //       request.input('MTCCode', sql.NVarChar, realMTCCode);
// // //       request.input('AtId', sql.Int, childData.AtId);
// // //       request.input('RefererId', sql.Int, childData.RefererId);
// // //       request.input('ChildName', sql.NVarChar, childData.ChildName);
// // //       request.input('MotherName', sql.NVarChar, childData.MotherName);
// // //       request.input('FatherName', sql.NVarChar, childData.FatherName);
// // //       request.input('MobileNumber', sql.NVarChar, childData.MobileNumber);
// // //       request.input('BPLNo', sql.NVarChar, childData.BPLNo || null);
// // //       request.input('DateofBirth', sql.Date, childData.DateofBirth);
// // //       request.input('GenderId', sql.Int, childData.GenderId);
// // //       request.input('CastId', sql.Int, childData.CastId);
// // //       request.input('Address', sql.NVarChar, childData.Address);
// // //       request.input('DistrictId', sql.Int, parseSafeInt(childData.DistrictId));
// // //       request.input('BlockId', sql.Int, parseSafeInt(childData.BlockId));
// // //       request.input('ICDSId', sql.Int, parseSafeInt(childData.ICDSId)); 
// // //       request.input('AnganwadiId', sql.Int, parseSafeInt(childData.AnganwadiId));
// // //       request.input('VillageName', sql.NVarChar, childData.VillageName);
// // //       request.input('AdmissionDate', sql.DateTime, childData.AdmissionDate);
// // //       request.input('AdmissionWeight', sql.Decimal(5,2), childData.AdmissionWeight);
// // //       request.input('AdmissionHeight', sql.Decimal(5,2), childData.AdmissionHeight);
// // //       request.input('AdmissionZScore', sql.Decimal(5,2), childData.AdmissionZScore);
// // //       request.input('AdmissionEdema', sql.Int, childData.AdmissionEdema);
// // //       request.input('AdmissionMuac', sql.Decimal(5,2), childData.AdmissionMuac);
// // //       request.input('AdmissionAppetite', sql.Int, childData.AdmissionAppetite);
// // //       request.input('BreastFeeding', sql.Int, childData.BreastFeeding);
// // //       request.input('ComplementaryFeeding', sql.Int, childData.ComplementaryFeeding);
// // //       request.input('MedicalComplication', sql.NVarChar, childData.MedicalComplication || null);
// // //       request.input('RegistrationImage', sql.NVarChar(sql.MAX), childData.RegistrationImage || null);

// // //       await request.query(queryChildren);

// // //       const requestWeights = new sql.Request(transaction);
// // //       requestWeights.input('SamNo', sql.NVarChar, childData.SamNo);
// // //       requestWeights.input('MTCCode', sql.NVarChar, realMTCCode);
// // //       requestWeights.input('Day0', sql.Decimal(5,2), childData.AdmissionWeight);
// // //       await requestWeights.query(`INSERT INTO [MTCJharkhand].[dbo].[MTCSAMDailyWeight] (SamNo, MTCCode, Day0) VALUES (@SamNo, @MTCCode, @Day0)`);

// // //       await transaction.commit();
// // //       return { success: true };

// // //     } catch (err) {
// // //       await transaction.rollback();
// // //       throw err;
// // //     }
// // //   } catch (err) { console.error('❌ Insert Error:', err); throw err; }
// // // }

// // // // SAFE VERSION: Excluding columns that triggered SQL errors (HemoglobinMother, MinimumWeight, TotalStay)
// // // // If you add these columns to your DB, uncomment the lines in this function.
// // // export async function updateDischargeChild(data: DischargeData) {
// // //   try {
// // //     const db = await getDBConnection();
// // //     const isMedicalTransfer = data.ExitIndicator === 3 ? 1 : 0;
// // //     const dischargeStatus = 1;

// // //     const query = `
// // //       UPDATE [MTCJharkhand].[dbo].[MTCSAMChildren]
// // //       SET 
// // //         DischargeDate = @DischargeDate,
// // //         DischargeWeight = @DischargeWeight,
// // //         DischargeHeight = @DischargeHeight,
// // //         DischargeEdema = @DischargeEdema,
// // //         DischargeMuac = @DischargeMuac,
// // //         ExitIndicator = @ExitIndicator,
// // //         IFAToMotherTablet = @IFAToMotherTablet,
// // //         MotherWages = @MotherWages,
// // //         IFAToMotherSyrup = @IFAToMotherSyrup,
// // //         DischargeImage = @DischargeImage,
// // //         MedicalTrasfer = @MedicalTrasfer,
// // //         DischargeStatus = @DischargeStatus
// // //       WHERE SamNo = @SamNo
// // //     `;

// // //     const request = db.request();
    
// // //     request.input('SamNo', sql.NVarChar, data.SamNo);
// // //     request.input('DischargeDate', sql.Date, new Date(data.DischargeDate));
// // //     request.input('DischargeWeight', sql.Decimal(5, 2), data.DischargeWeight);
// // //     request.input('DischargeHeight', sql.Decimal(5, 2), data.DischargeHeight);
// // //     request.input('DischargeMuac', sql.Decimal(5, 2), data.DischargeMuac);
// // //     request.input('DischargeEdema', sql.Int, data.DischargeEdema);
// // //     request.input('ExitIndicator', sql.Int, data.ExitIndicator);
// // //     request.input('IFAToMotherTablet', sql.Int, data.IFAToMotherTablet);
// // //     request.input('MotherWages', sql.Int, data.MotherWages);
// // //     request.input('IFAToMotherSyrup', sql.Int, data.IFAToMotherSyrup);
// // //     request.input('DischargeImage', sql.NVarChar(sql.MAX), data.DischargeImage ?? null);
    
// // //     // NOTE: request.input for HemoglobinMother, TotalStay, MinimumWeight removed due to SQL Error
// // //     // Add columns to DB first if you need them.

// // //     request.input('MedicalTrasfer', sql.Int, isMedicalTransfer);
// // //     request.input('DischargeStatus', sql.Int, dischargeStatus);

// // //     await request.query(query);

// // //     return { success: true };

// // //   } catch (err) {
// // //     console.error('❌ Error updating discharge record:', err);
// // //     throw err;
// // //   }
// // // }

// // // // NEW: Save/Update FollowUp Data
// // // export async function saveFollowUpData(data: FollowUpData) {
// // //   try {
// // //     const db = await getDBConnection();
    
// // //     const checkRecord = await db.request()
// // //       .input('SamNo', sql.NVarChar, data.SamNo)
// // //       .query(`SELECT COUNT(*) as count FROM [MTCJharkhand].[dbo].[MTCFollowUp] WHERE SamNo = @SamNo`);

// // //     const exists = checkRecord.recordset[0].count > 0;
// // //     const request = db.request();

// // //     request.input('SamNo', sql.NVarChar, data.SamNo);
// // //     request.input('MTCCode', sql.NVarChar, data.MTCCode || null);
// // //     request.input('MotherName', sql.NVarChar, data.MotherName || null);
// // //     request.input('DischargeDate', sql.Date, data.DischargeDate ? new Date(data.DischargeDate) : null);

// // //     // Helper to bind dynamically
// // //     const bindFollowUpInputs = (prefix: string, source: any) => {
// // //       const dbPrefix = prefix === "Fourth" ? "Fourt" : prefix; 
// // //       request.input(`${prefix}FollowUpDate`, sql.Date, source[`${prefix}FollowUpDate`] ? new Date(source[`${prefix}FollowUpDate`]) : null);
// // //       request.input(`${dbPrefix}FollowUpDoneOn`, sql.Date, source[`${dbPrefix}FollowUpDoneOn`] ? new Date(source[`${dbPrefix}FollowUpDoneOn`]) : null);
// // //       request.input(`${dbPrefix}FollowUpWeight`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpWeight`] || null);
// // //       request.input(`${dbPrefix}FollowUpHeight`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpHeight`] || null);
// // //       request.input(`${dbPrefix}FollowUpMUAC`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpMUAC`] || null);
// // //       request.input(`${dbPrefix}FollowUpZscore`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpZscore`] || null);
// // //       request.input(`${dbPrefix}FollowUpMotherBP`, sql.NVarChar, source[`${dbPrefix}FollowUpMotherBP`] || null);
// // //       request.input(`${dbPrefix}FollowUpMotherWeight`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpMotherWeight`] || null);
// // //       request.input(`${dbPrefix}FollowUpMotherHB`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpMotherHB`] || null);
// // //     };

// // //     bindFollowUpInputs('First', data);
// // //     bindFollowUpInputs('Second', data);
// // //     bindFollowUpInputs('Third', data);
    
// // //     // Fourth manual binding for spelling differences
// // //     request.input('FourthFollowUpDate', sql.Date, data.FourthFollowUpDate ? new Date(data.FourthFollowUpDate) : null);
// // //     request.input('FourtFollowUpDoneOn', sql.Date, data.FourtFollowUpDoneOn ? new Date(data.FourtFollowUpDoneOn) : null);
// // //     request.input('FourtFollowUpWeight', sql.Decimal(5, 2), data.FourtFollowUpWeight || null);
// // //     request.input('FourtFollowUpHeight', sql.Decimal(5, 2), data.FourtFollowUpHeight || null);
// // //     request.input('FourtFollowUpMUAC', sql.Decimal(5, 2), data.FourtFollowUpMUAC || null);
// // //     request.input('FourtFollowUpZscore', sql.Decimal(5, 2), data.FourtFollowUpZscore || null);
// // //     request.input('FourtFollowUpMotherBP', sql.NVarChar, data.FourtFollowUpMotherBP || null);
// // //     request.input('FourtFollowUpMotherWeight', sql.Decimal(5, 2), data.FourtFollowUpMotherWeight || null);
// // //     request.input('FourtFollowUpMotherHB', sql.Decimal(5, 2), data.FourtFollowUpMotherHB || null);

// // //     let query = '';

// // //     if (exists) {
// // //       query = `
// // //         UPDATE [MTCJharkhand].[dbo].[MTCFollowUp]
// // //         SET 
// // //           MTCCode = @MTCCode, MotherName = @MotherName, DischargeDate = @DischargeDate,
// // //           FirstFollowUpDate = @FirstFollowUpDate, FirstFollowUpDoneOn = @FirstFollowUpDoneOn, FirstFollowUpWeight = @FirstFollowUpWeight, FirstFollowUpHeight = @FirstFollowUpHeight, FirstFollowUpMUAC = @FirstFollowUpMUAC, FirstFollowUpZscore = @FirstFollowUpZscore, FirstFollowUpMotherBP = @FirstFollowUpMotherBP, FirstFollowUpMotherWeight = @FirstFollowUpMotherWeight, FirstFollowUpMotherHB = @FirstFollowUpMotherHB,
// // //           SecondFollowUpDate = @SecondFollowUpDate, SecondFollowUpDoneOn = @SecondFollowUpDoneOn, SecondFollowUpWeight = @SecondFollowUpWeight, SecondFollowUpHeight = @SecondFollowUpHeight, SecondFollowUpMUAC = @SecondFollowUpMUAC, SecondFollowUpZscore = @SecondFollowUpZscore, SecondFollowUpMotherBP = @SecondFollowUpMotherBP, SecondFollowUpMotherWeight = @SecondFollowUpMotherWeight, SecondFollowUpMotherHB = @SecondFollowUpMotherHB,
// // //           ThirdFollowUpDate = @ThirdFollowUpDate, ThirdFollowUpDoneOn = @ThirdFollowUpDoneOn, ThirdFollowUpWeight = @ThirdFollowUpWeight, ThirdFollowUpHeight = @ThirdFollowUpHeight, ThirdFollowUpMUAC = @ThirdFollowUpMUAC, ThirdFollowUpZscore = @ThirdFollowUpZscore, ThirdFollowUpMotherBP = @ThirdFollowUpMotherBP, ThirdFollowUpMotherWeight = @ThirdFollowUpMotherWeight, ThirdFollowUpMotherHB = @ThirdFollowUpMotherHB,
// // //           FourthFollowUpDate = @FourthFollowUpDate, FourtFollowUpDoneOn = @FourtFollowUpDoneOn, FourtFollowUpWeight = @FourtFollowUpWeight, FourtFollowUpHeight = @FourtFollowUpHeight, FourtFollowUpMUAC = @FourtFollowUpMUAC, FourtFollowUpZscore = @FourtFollowUpZscore, FourtFollowUpMotherBP = @FourtFollowUpMotherBP, FourtFollowUpMotherWeight = @FourtFollowUpMotherWeight, FourtFollowUpMotherHB = @FourtFollowUpMotherHB
// // //         WHERE SamNo = @SamNo
// // //       `;
// // //     } else {
// // //       query = `
// // //         INSERT INTO [MTCJharkhand].[dbo].[MTCFollowUp] (
// // //           SamNo, MTCCode, MotherName, DischargeDate,
// // //           FirstFollowUpDate, FirstFollowUpDoneOn, FirstFollowUpWeight, FirstFollowUpHeight, FirstFollowUpMUAC, FirstFollowUpZscore, FirstFollowUpMotherBP, FirstFollowUpMotherWeight, FirstFollowUpMotherHB,
// // //           SecondFollowUpDate, SecondFollowUpDoneOn, SecondFollowUpWeight, SecondFollowUpHeight, SecondFollowUpMUAC, SecondFollowUpZscore, SecondFollowUpMotherBP, SecondFollowUpMotherWeight, SecondFollowUpMotherHB,
// // //           ThirdFollowUpDate, ThirdFollowUpDoneOn, ThirdFollowUpWeight, ThirdFollowUpHeight, ThirdFollowUpMUAC, ThirdFollowUpZscore, ThirdFollowUpMotherBP, ThirdFollowUpMotherWeight, ThirdFollowUpMotherHB,
// // //           FourthFollowUpDate, FourtFollowUpDoneOn, FourtFollowUpWeight, FourtFollowUpHeight, FourtFollowUpMUAC, FourtFollowUpZscore, FourtFollowUpMotherBP, FourtFollowUpMotherWeight, FourtFollowUpMotherHB
// // //         ) VALUES (
// // //           @SamNo, @MTCCode, @MotherName, @DischargeDate,
// // //           @FirstFollowUpDate, @FirstFollowUpDoneOn, @FirstFollowUpWeight, @FirstFollowUpHeight, @FirstFollowUpMUAC, @FirstFollowUpZscore, @FirstFollowUpMotherBP, @FirstFollowUpMotherWeight, @FirstFollowUpMotherHB,
// // //           @SecondFollowUpDate, @SecondFollowUpDoneOn, @SecondFollowUpWeight, @SecondFollowUpHeight, @SecondFollowUpMUAC, @SecondFollowUpZscore, @SecondFollowUpMotherBP, @SecondFollowUpMotherWeight, @SecondFollowUpMotherHB,
// // //           @ThirdFollowUpDate, @ThirdFollowUpDoneOn, @ThirdFollowUpWeight, @ThirdFollowUpHeight, @ThirdFollowUpMUAC, @ThirdFollowUpZscore, @ThirdFollowUpMotherBP, @ThirdFollowUpMotherWeight, @ThirdFollowUpMotherHB,
// // //           @FourthFollowUpDate, @FourtFollowUpDoneOn, @FourtFollowUpWeight, @FourtFollowUpHeight, @FourtFollowUpMUAC, @FourtFollowUpZscore, @FourtFollowUpMotherBP, @FourtFollowUpMotherWeight, @FourtFollowUpMotherHB
// // //         )
// // //       `;
// // //     }

// // //     await request.query(query);
// // //     return { success: true, message: exists ? 'FollowUp Updated' : 'FollowUp Created' };

// // //   } catch (err) {
// // //     console.error('❌ Error saving FollowUp data:', err);
// // //     throw err;
// // //   }
// // // }

// // import sql from 'mssql';

// // // ==========================================
// // // 1. TYPE DEFINITIONS
// // // ==========================================

// // export interface ChildData {
// //   SamNo: string;
// //   MTCCode: string; 
// //   AtId: number;
// //   RefererId: number;
// //   ChildName: string;
// //   MotherName: string;
// //   FatherName: string;
// //   MobileNumber: string;
// //   BPLNo?: string;
// //   DateofBirth: string | Date;
// //   GenderId: number;
// //   CastId: number;
// //   Address: string;
// //   DistrictId: string | number;
// //   BlockId: string | number;
// //   ICDSId: string | number;
// //   AnganwadiId: string | number;
// //   VillageName: string;
// //   AdmissionDate: string | Date;
// //   AdmissionWeight: number;
// //   AdmissionHeight: number;
// //   AdmissionZScore: number;
// //   AdmissionEdema: number;
// //   AdmissionMuac: number;
// //   AdmissionAppetite: number;
// //   BreastFeeding: number;
// //   ComplementaryFeeding: number;
// //   MedicalComplication?: string;
// //   RegistrationImage?: string;
// // }

// // export interface DailyWeightData {
// //   Rid: number;
// //   SamNo: string;
// //   MTCCode: string;
// //   [key: string]: any; 
// // }

// // export interface DischargeData {
// //   SamNo: string;
// //   DischargeDate: string | Date;
// //   DischargeWeight: number;
// //   DischargeHeight: number;
// //   DischargeMuac: number;
// //   DischargeEdema: number;
// //   ExitIndicator: number;
// //   IFAToMotherTablet: number;
// //   MotherWages: number;
// //   IFAToMotherSyrup: number;
// //   // Optional fields (if columns exist in DB, uncomment in SQL query)
// //   HemoglobinMother?: number;
// //   DischargeImage?: string | null;
// //   TotalStay?: number | null;
// //   MinimumWeight?: number | null;
// // }

// // export interface FollowUpData {
// //   Rid?: number;
// //   SamNo: string;
// //   MTCCode?: string;
// //   MotherName?: string;
// //   DischargeDate?: string | Date;

// //   // First Follow Up
// //   FirstFollowUpDate?: string | Date;
// //   FirstFollowUpDoneOn?: string | Date;
// //   FirstFollowUpWeight?: number;
// //   FirstFollowUpHeight?: number;
// //   FirstFollowUpMUAC?: number;
// //   FirstFollowUpZscore?: number;
// //   FirstFollowUpMotherBP?: string;
// //   FirstFollowUpMotherWeight?: number;
// //   FirstFollowUpMotherHB?: number;

// //   // Second Follow Up
// //   SecondFollowUpDate?: string | Date;
// //   SecondFollowUpDoneOn?: string | Date;
// //   SecondFollowUpWeight?: number;
// //   SecondFollowUpHeight?: number;
// //   SecondFollowUpMUAC?: number;
// //   SecondFollowUpZscore?: number;
// //   SecondFollowUpMotherBP?: string;
// //   SecondFollowUpMotherWeight?: number;
// //   SecondFollowUpMotherHB?: number;

// //   // Third Follow Up
// //   ThirdFollowUpDate?: string | Date;
// //   ThirdFollowUpDoneOn?: string | Date;
// //   ThirdFollowUpWeight?: number;
// //   ThirdFollowUpHeight?: number;
// //   ThirdFollowUpMUAC?: number;
// //   ThirdFollowUpZscore?: number;
// //   ThirdFollowUpMotherBP?: string;
// //   ThirdFollowUpMotherWeight?: number;
// //   ThirdFollowUpMotherHB?: number;

// //   // Fourth Follow Up (Matches "Fourt" spelling in DB)
// //   FourthFollowUpDate?: string | Date;
// //   FourtFollowUpDoneOn?: string | Date;
// //   FourtFollowUpWeight?: number;
// //   FourtFollowUpHeight?: number;
// //   FourtFollowUpMUAC?: number;
// //   FourtFollowUpZscore?: number;
// //   FourtFollowUpMotherBP?: string;
// //   FourtFollowUpMotherWeight?: number;
// //   FourtFollowUpMotherHB?: number;
// // }

// // export interface DischargeListChild {
// //   SamNo: string;
// //   MTCCode: string;
// //   ChildName: string;
// //   FatherName: string;
// //   MotherName: string;
// //   DateofBirth: string | Date;
// //   AdmissionWeight: number;
// //   AdmissionHeight: number;
// //   AdmissionDate: string | Date;
// // }

// // // NEW: Equipment Interface (Matches SQL columns including typos)
// // export interface EquipmentData {
// //   Rid?: number;
// //   MTCCode: string;
// //   LastUpdated?: string | Date;
  
// //   // Status Columns (0 or 1, or Quantity)
// //   DigitalWeighingScaleWorking?: number;
// //   DigitalWeighingScaleNotworking?: number;
// //   StadiometerWorking?: number;
// //   StadiometerNotWorking?: number;
// //   InfantometerWroking?: number; // Matches DB typo
// //   InfantometerNotWroking?: number; // Matches DB typo
// //   MUACTapeAvailable?: number;
// //   WeingScalesWorking?: number; // Matches DB typo
// //   WeingScalesNotworking?: number;
// //   ClockWorking?: number;
// //   ClockNotWorking?: number;
// //   CalculatorWorking?: number;
// //   CalculatorNotWorking?: number;
// //   SAMChartAvailable?: number;
// //   SAMRegisterAvailable?: number;
// //   CameraWorking?: number;
// //   CameraNotWorking?: number;
// //   FileAvailable?: number;
// //   AlmiraRakeAvailable?: number;
// //   AlmiraAvailable?: number;
// //   ProtocolPosterAvailable?: number;
// //   MarkerAvailable?: number;
// //   WhiteBoardAvailable?: number;
// //   DisplayBoardAvailable?: number;
// //   TabWorking?: number;
// //   TabNotWorking?: number;
// //   ThermometersWorking?: number;
// //   ThermometersNotWorking?: number;
// //   ResuscitationEquipmentAval?: number;
// //   "NGTube6/8Available"?: number; // Special character handling
// //   SuctionEquipmentWorking?: number;
// //   SuctionEquipmentNotWorking?: number;
// //   BloodTransfusionKitAval?: number;
// //   HbMeterWorking?: number;
// //   HbMeterNotWorking?: number;
// //   GlucometerWorking?: number;
// //   GlucometerNotWorking?: number;
// //   BedWorking?: number;
// //   BedNotWorking?: number;
// //   SideTableWorking?: number;
// //   SideTableNotWorking?: number;
// //   IVStandWorking?: number;
// //   IVStandNotWorking?: number;
// //   RoomHeaterWorking?: number;
// //   RoomHeaterNotWorking?: number;
// //   CoolerACWorking?: number;
// //   CoolerACNotWorking?: number;
// //   FanWorking?: number;
// //   FanNotWorking?: number;
// //   TabaleChairWorking?: number; // Matches DB typo
// //   TabaleChairNotWorking?: number; // Matches DB typo
// //   DustbinAvailable?: number;
// //   ShoeRackAvailable?: number;
// //   TVWardandPlayArea?: number;
// //   InverterWorking?: number;
// //   InverterNotWorking?: number;
// //   ToysAvailable?: number;
// //   NutritionCousellingFlipBooks?: number;
// //   WashingMachineWorking?: number;
// //   WashingMachineNotWorking?: number;
// //   GeyserWorking?: number;
// //   GeyserNotWorking?: number;
// //   ComputerWorking?: number;
// //   ComputerNotWorking?: number;
// //   PrinterWorking?: number;
// //   PrinterNotWorking?: number;
// //   BedSeatAvailable?: number;
// //   MedicineTrayAvailable?: number;
// //   curtansAvailable?: number;
// //   TubelightWorking?: number;
// //   TubelightNotWorking?: number;
// //   CookingGasAvailable?: number;
// //   DietaryScaleAvailable?: number;
// //   MeasuringJarAvailable?: number;
// //   ElectricMixerBlendeAvailable?: number;
// //   WaterFilterROAvailable?: number;
// //   RefrigeratorAvailable?: number;
// //   UtensilforKitchenAvailable?: number;
// //   MassacringCupGlassSpoon?: number; // Matches DB typo
// //   PressercookerAvailable?: number; // Matches DB typo
// //   SteelCacontnerAvailable?: number; // Matches DB typo
// // }

// // // ==========================================
// // // 2. DB CONFIGURATION
// // // ==========================================

// // const config: sql.config = {
// //   user: process.env.DB_USER!,
// //   password: process.env.DB_PASSWORD!,
// //   server: process.env.DB_SERVER!,
// //   port: parseInt(process.env.DB_PORT || '1433'),
// //   database: process.env.DB_NAME!,
// //   options: {
// //     encrypt: false,
// //     trustServerCertificate: true,
// //     enableArithAbort: true,
// //   },
// //   pool: {
// //     max: 10,
// //     min: 0,
// //     idleTimeoutMillis: 30000
// //   }
// // };

// // // ==========================================
// // // 3. SINGLETON CONNECTION POOL
// // // ==========================================

// // let pool: sql.ConnectionPool | null = null;

// // export async function getDBConnection() {
// //   try {
// //     if (pool && pool.connected) {
// //       return pool;
// //     }
// //     pool = await sql.connect(config);
// //     return pool;
// //   } catch (err) {
// //     console.error('❌ Database Connection Failed:', err);
// //     throw err;
// //   }
// // }

// // // ==========================================
// // // 4. HELPER UTILS
// // // ==========================================

// // const parseSafeInt = (val: any): number | null => {
// //   if (!val) return null;
// //   if (typeof val === 'number') return val;
// //   const parsed = parseInt(val, 10);
// //   return isNaN(parsed) ? null : parsed;
// // };

// // // ==========================================
// // // 5. FETCH FUNCTIONS (CORE DATA)
// // // ==========================================

// // export async function getChildrenFromDB() {
// //   try {
// //     const db = await getDBConnection();
// //     const result = await db.request().query(`
// //       SELECT 
// //         SamNo, MTCCode, ChildName, MotherName, FatherName, 
// //         MobileNumber, DateofBirth, AdmissionDate, AdmissionWeight, 
// //         AdmissionHeight, DistrictId, BlockId, VillageName
// //       FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
// //       ORDER BY AdmissionDate DESC
// //     `);
// //     return result.recordset;
// //   } catch (err) {
// //     console.error('❌ Fetch Children Error:', err);
// //     throw err;
// //   }
// // }

// // export async function getDischargeList() {
// //   try {
// //     const db = await getDBConnection();
// //     // We filter by DischargeDate IS NULL to only show currently admitted children
// //     const query = `
// //       SELECT 
// //         SamNo, 
// //         MTCCode, 
// //         ChildName, 
// //         FatherName, 
// //         MotherName, 
// //         DateofBirth, 
// //         AdmissionWeight, 
// //         AdmissionHeight, 
// //         AdmissionDate
// //       FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
// //       WHERE DischargeDate IS NULL
// //       ORDER BY AdmissionDate DESC
// //     `;
// //     const result = await db.request().query(query);
// //     return result.recordset as DischargeListChild[];
// //   } catch (err) {
// //     console.error('❌ Error fetching discharge list:', err);
// //     throw err;
// //   }
// // }

// // export async function getDailyWeights(samNo: string) {
// //   try {
// //     const db = await getDBConnection();
// //     const result = await db.request()
// //       .input('SamNo', sql.NVarChar, samNo)
// //       .query(`
// //         SELECT * FROM [MTCJharkhand].[dbo].[MTCSAMDailyWeight] 
// //         WHERE SamNo = @SamNo
// //       `);
    
// //     return result.recordset[0] || null;
// //   } catch (err) {
// //     console.error('❌ Fetch Weight Error:', err);
// //     throw err;
// //   }
// // }

// // export async function getChildBySamNo(samNo: string) {
// //   try {
// //     const db = await getDBConnection();
// //     const result = await db.request()
// //       .input('SamNo', sql.NVarChar, samNo)
// //       .query(`
// //         SELECT TOP 1 
// //           SamNo, MTCCode, ChildName, MotherName, FatherName, 
// //           AdmissionWeight, AdmissionHeight, AdmissionMuac, 
// //           AdmissionEdema, AdmissionDate, DateofBirth
// //         FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
// //         WHERE SamNo = @SamNo
// //       `);
// //     return result.recordset[0] || null;
// //   } catch (err) {
// //     console.error('❌ Error fetching child:', err);
// //     throw err;
// //   }
// // }

// // export async function getFollowUpData(samNo: string) {
// //   try {
// //     const db = await getDBConnection();
// //     const result = await db.request()
// //       .input('SamNo', sql.NVarChar, samNo)
// //       .query(`
// //         SELECT TOP 1 * FROM [MTCJharkhand].[dbo].[MTCFollowUp] 
// //         WHERE SamNo = @SamNo
// //       `);
// //     return result.recordset[0] as FollowUpData || null;
// //   } catch (err) {
// //     console.error('❌ Error fetching FollowUp data:', err);
// //     throw err;
// //   }
// // }

// // // NEW: Fetch Equipment Data
// // export async function getEquipmentData(mtcCode: string) {
// //   try {
// //     const db = await getDBConnection();
// //     const result = await db.request()
// //       .input('MTCCode', sql.NVarChar, mtcCode)
// //       .query(`
// //         SELECT TOP 1 * FROM [MTCJharkhand].[dbo].[MTCEquipment] 
// //         WHERE MTCCode = @MTCCode
// //       `);
// //     return result.recordset[0] as EquipmentData || null;
// //   } catch (err) {
// //     console.error('❌ Error fetching Equipment Data:', err);
// //     throw err;
// //   }
// // }

// // // ==========================================
// // // 6. REFERENCE DATA FETCHERS (DROPDOWNS)
// // // ==========================================

// // export async function getGenderList() {
// //   try {
// //     const db = await getDBConnection();
// //     const result = await db.request().query(`SELECT [GenderId], [GenderName] FROM [MTCJharkhand].[dbo].[MTCGender]`);
// //     return result.recordset;
// //   } catch (err) { console.error('Error fetching Genders', err); throw err; }
// // }

// // export async function getCastList() {
// //   try {
// //     const db = await getDBConnection();
// //     const result = await db.request().query(`SELECT [CastId], [CastName] FROM [MTCJharkhand].[dbo].[MTCCasts]`);
// //     return result.recordset;
// //   } catch (err) { console.error('Error fetching Casts', err); throw err; }
// // }

// // export async function getDistrictList() {
// //   try {
// //     const db = await getDBConnection();
// //     const result = await db.request().query(`SELECT [DistrictId], [DistrictCode], [DistrictName] FROM [MTCJharkhand].[dbo].[MTCDistricts] ORDER BY [DistrictName] ASC`);
// //     return result.recordset;
// //   } catch (err) { console.error('Error fetching Districts', err); throw err; }
// // }

// // export async function getBlockList(districtId?: number | string) {
// //   try {
// //     const db = await getDBConnection();
// //     let query = `SELECT [BlockId], [BlockName], [DistrictId] FROM [MTCJharkhand].[dbo].[MTCBlock]`;
// //     const request = db.request();
// //     if (districtId) {
// //       query += ` WHERE [DistrictId] = @DistrictId`;
// //       request.input('DistrictId', sql.Int, districtId);
// //     }
// //     query += ` ORDER BY [BlockName] ASC`;
// //     const result = await request.query(query);
// //     return result.recordset;
// //   } catch (err) { console.error('Error fetching Block List', err); throw err; }
// // }

// // export async function getICDSList(districtId?: number | string) {
// //   try {
// //     const db = await getDBConnection();
// //     let query = `SELECT [ICDSId], [ICDSName], [DistrictId] FROM [MTCJharkhand].[dbo].[MTCIcds]`;
// //     const request = db.request();
// //     if (districtId) {
// //       query += ` WHERE [DistrictId] = @DistrictId`;
// //       request.input('DistrictId', sql.Int, districtId);
// //     }
// //     query += ` ORDER BY [ICDSName] ASC`;
// //     const result = await request.query(query);
// //     return result.recordset;
// //   } catch (err) { console.error('Error fetching ICDS List', err); throw err; }
// // }

// // export async function getAnganwadiList(icdsId?: number | string) {
// //   try {
// //     const db = await getDBConnection();
// //     let query = `SELECT [AnganwadiId], [AnganwadiName], [ICDSId] FROM [MTCJharkhand].[dbo].[MTCAnganwadi]`;
// //     const request = db.request();
// //     if (icdsId) {
// //       query += ` WHERE [ICDSId] = @ICDSId`;
// //       request.input('ICDSId', sql.Int, icdsId);
// //     }
// //     query += ` ORDER BY [AnganwadiName] ASC`;
// //     const result = await request.query(query);
// //     return result.recordset;
// //   } catch (err) { console.error('Error fetching Anganwadi List', err); throw err; }
// // }

// // // ==========================================
// // // 7. GENERATE NEXT SAM NUMBER
// // // ==========================================

// // export async function generateNextSamNumber() {
// //   try {
// //     const db = await getDBConnection();
    
// //     // 1. Fetch Dynamic Prefix
// //     const mtcResult = await db.request().query(`SELECT TOP 1 MTCCode FROM [MTCJharkhand].[dbo].[MTCCenter]`);
// //     let mtcPrefix = "JH/WSB/CBS"; 
// //     if (mtcResult.recordset.length > 0 && mtcResult.recordset[0].MTCCode) {
// //        mtcPrefix = mtcResult.recordset[0].MTCCode;
// //     }

// //     // 2. Find last record
// //     const searchPattern = `${mtcPrefix}/%`;
// //     const result = await db.request()
// //       .input('Pattern', sql.NVarChar, searchPattern)
// //       .query(`
// //         SELECT TOP 1 SamNo 
// //         FROM [MTCJharkhand].[dbo].[MTCSAMChildren] 
// //         WHERE SamNo LIKE @Pattern
// //         ORDER BY LEN(SamNo) DESC, SamNo DESC
// //       `);

// //     const lastRecord = result.recordset[0];

// //     // 3. Generate Number
// //     if (!lastRecord || !lastRecord.SamNo) {
// //       return `${mtcPrefix}/1001`;
// //     }

// //     const parts = lastRecord.SamNo.split('/');
// //     const lastNumStr = parts[parts.length - 1]; 
// //     const lastNum = parseInt(lastNumStr, 10);

// //     if (isNaN(lastNum)) return `${mtcPrefix}/${Date.now().toString().slice(-4)}`; 

// //     const nextNum = lastNum + 1;
// //     return `${mtcPrefix}/${nextNum}`;

// //   } catch (err) {
// //     console.error('❌ Error generating SAM No:', err);
// //     return `JH/ERROR/${Math.floor(Math.random() * 1000)}`; 
// //   }
// // }

// // // ==========================================
// // // 8. INSERT / UPDATE FUNCTIONS
// // // ==========================================

// // export async function updateDailyWeight(samNo: string, mtcCode: string, day: number, weight: number) {
// //   try {
// //     if (day < 0 || day > 59) throw new Error("Day must be between 0 and 59");

// //     const db = await getDBConnection();
// //     const checkRow = await db.request()
// //       .input('SamNo', sql.NVarChar, samNo)
// //       .query(`SELECT count(*) as count FROM [MTCJharkhand].[dbo].[MTCSAMDailyWeight] WHERE SamNo = @SamNo`);

// //     const exists = checkRow.recordset[0].count > 0;
// //     const dayColumn = `Day${day}`;

// //     if (exists) {
// //       await db.request()
// //         .input('SamNo', sql.NVarChar, samNo)
// //         .input('Weight', sql.Decimal(5, 2), weight)
// //         .query(`UPDATE [MTCJharkhand].[dbo].[MTCSAMDailyWeight] SET ${dayColumn} = @Weight WHERE SamNo = @SamNo`);
// //     } else {
// //       await db.request()
// //         .input('SamNo', sql.NVarChar, samNo)
// //         .input('MTCCode', sql.NVarChar, mtcCode)
// //         .input('Weight', sql.Decimal(5, 2), weight)
// //         .query(`INSERT INTO [MTCJharkhand].[dbo].[MTCSAMDailyWeight] (SamNo, MTCCode, ${dayColumn}) VALUES (@SamNo, @MTCCode, @Weight)`);
// //     }
// //     return { success: true, message: `Updated ${dayColumn}` };
// //   } catch (err) { console.error(`Error updating weight:`, err); throw err; }
// // }

// // export async function registerChildInDB(childData: ChildData) {
// //   try {
// //     const db = await getDBConnection();
    
// //     // Fallback MTCCode logic
// //     let realMTCCode = childData.MTCCode;
// //     try {
// //         const mtcQuery = await db.request().query(`SELECT TOP 1 MTCCode FROM [MTCJharkhand].[dbo].[MTCCenter]`);
// //         if (mtcQuery.recordset.length > 0 && mtcQuery.recordset[0].MTCCode) {
// //             realMTCCode = mtcQuery.recordset[0].MTCCode;
// //         }
// //     } catch(e) { console.warn("Using provided MTCCode as fallback."); }

// //     const transaction = new sql.Transaction(db);
// //     await transaction.begin();

// //     try {
// //       const request = new sql.Request(transaction);
// //       const queryChildren = `
// //         INSERT INTO [MTCJharkhand].[dbo].[MTCSAMChildren] (
// //           SamNo, MTCCode, AtId, RefererId, ChildName, MotherName, FatherName, 
// //           MobileNumber, BPLNo, DateofBirth, GenderId, CastId, Address, 
// //           DistrictId, BlockId, ICDSId, AnganwadiId, VillageName, AdmissionDate, 
// //           AdmissionWeight, AdmissionHeight, AdmissionZScore, AdmissionEdema, 
// //           AdmissionMuac, AdmissionAppetite, BreastFeeding, ComplementaryFeeding, 
// //           MedicalComplication, RegistrationImage, DischargeDate, DischargeWeight, 
// //           DischargeHeight, DischargeEdema, DischargeMuac, DischargeZScore, 
// //           ExitIndicator, IFAToMotherTablet, MotherWages, IFAToMotherSyrup, 
// //           DischargeStatus, DischargeImage, MedicalTrasfer
// //         )
// //         VALUES (
// //           @SamNo, @MTCCode, @AtId, @RefererId, @ChildName, @MotherName, @FatherName, 
// //           @MobileNumber, @BPLNo, @DateofBirth, @GenderId, @CastId, @Address, 
// //           @DistrictId, @BlockId, @ICDSId, @AnganwadiId, @VillageName, @AdmissionDate, 
// //           @AdmissionWeight, @AdmissionHeight, @AdmissionZScore, @AdmissionEdema, 
// //           @AdmissionMuac, @AdmissionAppetite, @BreastFeeding, @ComplementaryFeeding, 
// //           @MedicalComplication, @RegistrationImage, NULL, NULL, 
// //           NULL, NULL, NULL, NULL, 
// //           NULL, NULL, NULL, NULL, 
// //           NULL, NULL, NULL
// //         )
// //       `;

// //       request.input('SamNo', sql.NVarChar, childData.SamNo);
// //       request.input('MTCCode', sql.NVarChar, realMTCCode);
// //       request.input('AtId', sql.Int, childData.AtId);
// //       request.input('RefererId', sql.Int, childData.RefererId);
// //       request.input('ChildName', sql.NVarChar, childData.ChildName);
// //       request.input('MotherName', sql.NVarChar, childData.MotherName);
// //       request.input('FatherName', sql.NVarChar, childData.FatherName);
// //       request.input('MobileNumber', sql.NVarChar, childData.MobileNumber);
// //       request.input('BPLNo', sql.NVarChar, childData.BPLNo || null);
// //       request.input('DateofBirth', sql.Date, childData.DateofBirth);
// //       request.input('GenderId', sql.Int, childData.GenderId);
// //       request.input('CastId', sql.Int, childData.CastId);
// //       request.input('Address', sql.NVarChar, childData.Address);
// //       request.input('DistrictId', sql.Int, parseSafeInt(childData.DistrictId));
// //       request.input('BlockId', sql.Int, parseSafeInt(childData.BlockId));
// //       request.input('ICDSId', sql.Int, parseSafeInt(childData.ICDSId)); 
// //       request.input('AnganwadiId', sql.Int, parseSafeInt(childData.AnganwadiId));
// //       request.input('VillageName', sql.NVarChar, childData.VillageName);
// //       request.input('AdmissionDate', sql.DateTime, childData.AdmissionDate);
// //       request.input('AdmissionWeight', sql.Decimal(5,2), childData.AdmissionWeight);
// //       request.input('AdmissionHeight', sql.Decimal(5,2), childData.AdmissionHeight);
// //       request.input('AdmissionZScore', sql.Decimal(5,2), childData.AdmissionZScore);
// //       request.input('AdmissionEdema', sql.Int, childData.AdmissionEdema);
// //       request.input('AdmissionMuac', sql.Decimal(5,2), childData.AdmissionMuac);
// //       request.input('AdmissionAppetite', sql.Int, childData.AdmissionAppetite);
// //       request.input('BreastFeeding', sql.Int, childData.BreastFeeding);
// //       request.input('ComplementaryFeeding', sql.Int, childData.ComplementaryFeeding);
// //       request.input('MedicalComplication', sql.NVarChar, childData.MedicalComplication || null);
// //       request.input('RegistrationImage', sql.NVarChar(sql.MAX), childData.RegistrationImage || null);

// //       await request.query(queryChildren);

// //       const requestWeights = new sql.Request(transaction);
// //       requestWeights.input('SamNo', sql.NVarChar, childData.SamNo);
// //       requestWeights.input('MTCCode', sql.NVarChar, realMTCCode);
// //       requestWeights.input('Day0', sql.Decimal(5,2), childData.AdmissionWeight);
// //       await requestWeights.query(`INSERT INTO [MTCJharkhand].[dbo].[MTCSAMDailyWeight] (SamNo, MTCCode, Day0) VALUES (@SamNo, @MTCCode, @Day0)`);

// //       await transaction.commit();
// //       return { success: true };

// //     } catch (err) {
// //       await transaction.rollback();
// //       throw err;
// //     }
// //   } catch (err) { console.error('❌ Insert Error:', err); throw err; }
// // }

// // export async function updateDischargeChild(data: DischargeData) {
// //   try {
// //     const db = await getDBConnection();
// //     const isMedicalTransfer = data.ExitIndicator === 3 ? 1 : 0;
// //     const dischargeStatus = 1;

// //     const query = `
// //       UPDATE [MTCJharkhand].[dbo].[MTCSAMChildren]
// //       SET 
// //         DischargeDate = @DischargeDate,
// //         DischargeWeight = @DischargeWeight,
// //         DischargeHeight = @DischargeHeight,
// //         DischargeEdema = @DischargeEdema,
// //         DischargeMuac = @DischargeMuac,
// //         ExitIndicator = @ExitIndicator,
// //         IFAToMotherTablet = @IFAToMotherTablet,
// //         MotherWages = @MotherWages,
// //         IFAToMotherSyrup = @IFAToMotherSyrup,
// //         DischargeImage = @DischargeImage,
// //         MedicalTrasfer = @MedicalTrasfer,
// //         DischargeStatus = @DischargeStatus
// //       WHERE SamNo = @SamNo
// //     `;

// //     const request = db.request();
    
// //     request.input('SamNo', sql.NVarChar, data.SamNo);
// //     request.input('DischargeDate', sql.Date, new Date(data.DischargeDate));
// //     request.input('DischargeWeight', sql.Decimal(5, 2), data.DischargeWeight);
// //     request.input('DischargeHeight', sql.Decimal(5, 2), data.DischargeHeight);
// //     request.input('DischargeMuac', sql.Decimal(5, 2), data.DischargeMuac);
// //     request.input('DischargeEdema', sql.Int, data.DischargeEdema);
// //     request.input('ExitIndicator', sql.Int, data.ExitIndicator);
// //     request.input('IFAToMotherTablet', sql.Int, data.IFAToMotherTablet);
// //     request.input('MotherWages', sql.Int, data.MotherWages);
// //     request.input('IFAToMotherSyrup', sql.Int, data.IFAToMotherSyrup);
// //     request.input('DischargeImage', sql.NVarChar(sql.MAX), data.DischargeImage ?? null);
// //     request.input('MedicalTrasfer', sql.Int, isMedicalTransfer);
// //     request.input('DischargeStatus', sql.Int, dischargeStatus);

// //     await request.query(query);
// //     return { success: true };

// //   } catch (err) {
// //     console.error('❌ Error updating discharge record:', err);
// //     throw err;
// //   }
// // }

// // export async function saveFollowUpData(data: FollowUpData) {
// //   try {
// //     const db = await getDBConnection();
    
// //     const checkRecord = await db.request()
// //       .input('SamNo', sql.NVarChar, data.SamNo)
// //       .query(`SELECT COUNT(*) as count FROM [MTCJharkhand].[dbo].[MTCFollowUp] WHERE SamNo = @SamNo`);

// //     const exists = checkRecord.recordset[0].count > 0;
// //     const request = db.request();

// //     request.input('SamNo', sql.NVarChar, data.SamNo);
// //     request.input('MTCCode', sql.NVarChar, data.MTCCode || null);
// //     request.input('MotherName', sql.NVarChar, data.MotherName || null);
// //     request.input('DischargeDate', sql.Date, data.DischargeDate ? new Date(data.DischargeDate) : null);

// //     const bindFollowUpInputs = (prefix: string, source: any) => {
// //       const dbPrefix = prefix === "Fourth" ? "Fourt" : prefix; 
// //       request.input(`${prefix}FollowUpDate`, sql.Date, source[`${prefix}FollowUpDate`] ? new Date(source[`${prefix}FollowUpDate`]) : null);
// //       request.input(`${dbPrefix}FollowUpDoneOn`, sql.Date, source[`${dbPrefix}FollowUpDoneOn`] ? new Date(source[`${dbPrefix}FollowUpDoneOn`]) : null);
// //       request.input(`${dbPrefix}FollowUpWeight`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpWeight`] || null);
// //       request.input(`${dbPrefix}FollowUpHeight`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpHeight`] || null);
// //       request.input(`${dbPrefix}FollowUpMUAC`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpMUAC`] || null);
// //       request.input(`${dbPrefix}FollowUpZscore`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpZscore`] || null);
// //       request.input(`${dbPrefix}FollowUpMotherBP`, sql.NVarChar, source[`${dbPrefix}FollowUpMotherBP`] || null);
// //       request.input(`${dbPrefix}FollowUpMotherWeight`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpMotherWeight`] || null);
// //       request.input(`${dbPrefix}FollowUpMotherHB`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpMotherHB`] || null);
// //     };

// //     bindFollowUpInputs('First', data);
// //     bindFollowUpInputs('Second', data);
// //     bindFollowUpInputs('Third', data);
    
// //     // Fourth manual binding
// //     request.input('FourthFollowUpDate', sql.Date, data.FourthFollowUpDate ? new Date(data.FourthFollowUpDate) : null);
// //     request.input('FourtFollowUpDoneOn', sql.Date, data.FourtFollowUpDoneOn ? new Date(data.FourtFollowUpDoneOn) : null);
// //     request.input('FourtFollowUpWeight', sql.Decimal(5, 2), data.FourtFollowUpWeight || null);
// //     request.input('FourtFollowUpHeight', sql.Decimal(5, 2), data.FourtFollowUpHeight || null);
// //     request.input('FourtFollowUpMUAC', sql.Decimal(5, 2), data.FourtFollowUpMUAC || null);
// //     request.input('FourtFollowUpZscore', sql.Decimal(5, 2), data.FourtFollowUpZscore || null);
// //     request.input('FourtFollowUpMotherBP', sql.NVarChar, data.FourtFollowUpMotherBP || null);
// //     request.input('FourtFollowUpMotherWeight', sql.Decimal(5, 2), data.FourtFollowUpMotherWeight || null);
// //     request.input('FourtFollowUpMotherHB', sql.Decimal(5, 2), data.FourtFollowUpMotherHB || null);

// //     let query = '';

// //     if (exists) {
// //       query = `
// //         UPDATE [MTCJharkhand].[dbo].[MTCFollowUp]
// //         SET 
// //           MTCCode = @MTCCode, MotherName = @MotherName, DischargeDate = @DischargeDate,
// //           FirstFollowUpDate = @FirstFollowUpDate, FirstFollowUpDoneOn = @FirstFollowUpDoneOn, FirstFollowUpWeight = @FirstFollowUpWeight, FirstFollowUpHeight = @FirstFollowUpHeight, FirstFollowUpMUAC = @FirstFollowUpMUAC, FirstFollowUpZscore = @FirstFollowUpZscore, FirstFollowUpMotherBP = @FirstFollowUpMotherBP, FirstFollowUpMotherWeight = @FirstFollowUpMotherWeight, FirstFollowUpMotherHB = @FirstFollowUpMotherHB,
// //           SecondFollowUpDate = @SecondFollowUpDate, SecondFollowUpDoneOn = @SecondFollowUpDoneOn, SecondFollowUpWeight = @SecondFollowUpWeight, SecondFollowUpHeight = @SecondFollowUpHeight, SecondFollowUpMUAC = @SecondFollowUpMUAC, SecondFollowUpZscore = @SecondFollowUpZscore, SecondFollowUpMotherBP = @SecondFollowUpMotherBP, SecondFollowUpMotherWeight = @SecondFollowUpMotherWeight, SecondFollowUpMotherHB = @SecondFollowUpMotherHB,
// //           ThirdFollowUpDate = @ThirdFollowUpDate, ThirdFollowUpDoneOn = @ThirdFollowUpDoneOn, ThirdFollowUpWeight = @ThirdFollowUpWeight, ThirdFollowUpHeight = @ThirdFollowUpHeight, ThirdFollowUpMUAC = @ThirdFollowUpMUAC, ThirdFollowUpZscore = @ThirdFollowUpZscore, ThirdFollowUpMotherBP = @ThirdFollowUpMotherBP, ThirdFollowUpMotherWeight = @ThirdFollowUpMotherWeight, ThirdFollowUpMotherHB = @ThirdFollowUpMotherHB,
// //           FourthFollowUpDate = @FourthFollowUpDate, FourtFollowUpDoneOn = @FourtFollowUpDoneOn, FourtFollowUpWeight = @FourtFollowUpWeight, FourtFollowUpHeight = @FourtFollowUpHeight, FourtFollowUpMUAC = @FourtFollowUpMUAC, FourtFollowUpZscore = @FourtFollowUpZscore, FourtFollowUpMotherBP = @FourtFollowUpMotherBP, FourtFollowUpMotherWeight = @FourtFollowUpMotherWeight, FourtFollowUpMotherHB = @FourtFollowUpMotherHB
// //         WHERE SamNo = @SamNo
// //       `;
// //     } else {
// //       query = `
// //         INSERT INTO [MTCJharkhand].[dbo].[MTCFollowUp] (
// //           SamNo, MTCCode, MotherName, DischargeDate,
// //           FirstFollowUpDate, FirstFollowUpDoneOn, FirstFollowUpWeight, FirstFollowUpHeight, FirstFollowUpMUAC, FirstFollowUpZscore, FirstFollowUpMotherBP, FirstFollowUpMotherWeight, FirstFollowUpMotherHB,
// //           SecondFollowUpDate, SecondFollowUpDoneOn, SecondFollowUpWeight, SecondFollowUpHeight, SecondFollowUpMUAC, SecondFollowUpZscore, SecondFollowUpMotherBP, SecondFollowUpMotherWeight, SecondFollowUpMotherHB,
// //           ThirdFollowUpDate, ThirdFollowUpDoneOn, ThirdFollowUpWeight, ThirdFollowUpHeight, ThirdFollowUpMUAC, ThirdFollowUpZscore, ThirdFollowUpMotherBP, ThirdFollowUpMotherWeight, ThirdFollowUpMotherHB,
// //           FourthFollowUpDate, FourtFollowUpDoneOn, FourtFollowUpWeight, FourtFollowUpHeight, FourtFollowUpMUAC, FourtFollowUpZscore, FourtFollowUpMotherBP, FourtFollowUpMotherWeight, FourtFollowUpMotherHB
// //         ) VALUES (
// //           @SamNo, @MTCCode, @MotherName, @DischargeDate,
// //           @FirstFollowUpDate, @FirstFollowUpDoneOn, @FirstFollowUpWeight, @FirstFollowUpHeight, @FirstFollowUpMUAC, @FirstFollowUpZscore, @FirstFollowUpMotherBP, @FirstFollowUpMotherWeight, @FirstFollowUpMotherHB,
// //           @SecondFollowUpDate, @SecondFollowUpDoneOn, @SecondFollowUpWeight, @SecondFollowUpHeight, @SecondFollowUpMUAC, @SecondFollowUpZscore, @SecondFollowUpMotherBP, @SecondFollowUpMotherWeight, @SecondFollowUpMotherHB,
// //           @ThirdFollowUpDate, @ThirdFollowUpDoneOn, @ThirdFollowUpWeight, @ThirdFollowUpHeight, @ThirdFollowUpMUAC, @ThirdFollowUpZscore, @ThirdFollowUpMotherBP, @ThirdFollowUpMotherWeight, @ThirdFollowUpMotherHB,
// //           @FourthFollowUpDate, @FourtFollowUpDoneOn, @FourtFollowUpWeight, @FourtFollowUpHeight, @FourtFollowUpMUAC, @FourtFollowUpZscore, @FourtFollowUpMotherBP, @FourtFollowUpMotherWeight, @FourtFollowUpMotherHB
// //         )
// //       `;
// //     }

// //     await request.query(query);
// //     return { success: true, message: exists ? 'FollowUp Updated' : 'FollowUp Created' };

// //   } catch (err) {
// //     console.error('❌ Error saving FollowUp data:', err);
// //     throw err;
// //   }
// // }

// // // NEW: Save/Update Equipment Function
// // export async function saveEquipmentData(data: EquipmentData) {
// //   try {
// //     const db = await getDBConnection();
    
// //     // Check if record exists
// //     const checkRecord = await db.request()
// //       .input('MTCCode', sql.NVarChar, data.MTCCode)
// //       .query(`SELECT COUNT(*) as count FROM [MTCJharkhand].[dbo].[MTCEquipment] WHERE MTCCode = @MTCCode`);

// //     const exists = checkRecord.recordset[0].count > 0;
// //     const request = db.request();

// //     // 1. Basic Inputs
// //     request.input('MTCCode', sql.NVarChar, data.MTCCode);
// //     request.input('LastUpdated', sql.DateTime, new Date());

// //     // 2. List of all equipment columns (Matches SQL spelling)
// //     const equipmentCols = [
// //       "DigitalWeighingScaleWorking", "DigitalWeighingScaleNotworking", "StadiometerWorking", "StadiometerNotWorking",
// //       "InfantometerWroking", "InfantometerNotWroking", "MUACTapeAvailable", "WeingScalesWorking", "WeingScalesNotworking",
// //       "ClockWorking", "ClockNotWorking", "CalculatorWorking", "CalculatorNotWorking", "SAMChartAvailable",
// //       "SAMRegisterAvailable", "CameraWorking", "CameraNotWorking", "FileAvailable", "AlmiraRakeAvailable",
// //       "AlmiraAvailable", "ProtocolPosterAvailable", "MarkerAvailable", "WhiteBoardAvailable", "DisplayBoardAvailable",
// //       "TabWorking", "TabNotWorking", "ThermometersWorking", "ThermometersNotWorking", "ResuscitationEquipmentAval",
// //       "NGTube6/8Available", "SuctionEquipmentWorking", "SuctionEquipmentNotWorking", "BloodTransfusionKitAval",
// //       "HbMeterWorking", "HbMeterNotWorking", "GlucometerWorking", "GlucometerNotWorking", "BedWorking", "BedNotWorking",
// //       "SideTableWorking", "SideTableNotWorking", "IVStandWorking", "IVStandNotWorking", "RoomHeaterWorking",
// //       "RoomHeaterNotWorking", "CoolerACWorking", "CoolerACNotWorking", "FanWorking", "FanNotWorking",
// //       "TabaleChairWorking", "TabaleChairNotWorking", "DustbinAvailable", "ShoeRackAvailable", "TVWardandPlayArea",
// //       "InverterWorking", "InverterNotWorking", "ToysAvailable", "NutritionCousellingFlipBooks", "WashingMachineWorking",
// //       "WashingMachineNotWorking", "GeyserWorking", "GeyserNotWorking", "ComputerWorking", "ComputerNotWorking",
// //       "PrinterWorking", "PrinterNotWorking", "BedSeatAvailable", "MedicineTrayAvailable", "curtansAvailable",
// //       "TubelightWorking", "TubelightNotWorking", "CookingGasAvailable", "DietaryScaleAvailable", "MeasuringJarAvailable",
// //       "ElectricMixerBlendeAvailable", "WaterFilterROAvailable", "RefrigeratorAvailable", "UtensilforKitchenAvailable",
// //       "MassacringCupGlassSpoon", "PressercookerAvailable", "SteelCacontnerAvailable"
// //     ];

// //     // 3. Bind Inputs dynamically (stripping bad chars for @params)
// //     equipmentCols.forEach(col => {
// //       const paramName = col.replace(/[^a-zA-Z0-9]/g, '');
// //       const value = data[col as keyof EquipmentData] !== undefined ? data[col as keyof EquipmentData] : 0;
// //       request.input(paramName, sql.Int, value);
// //     });

// //     let query = '';

// //     if (exists) {
// //       // Generate UPDATE string
// //       const updateSet = equipmentCols.map(col => {
// //         const paramName = col.replace(/[^a-zA-Z0-9]/g, '');
// //         return `[${col}] = @${paramName}`;
// //       }).join(', ');
      
// //       query = `
// //         UPDATE [MTCJharkhand].[dbo].[MTCEquipment]
// //         SET LastUpdated = @LastUpdated, ${updateSet}
// //         WHERE MTCCode = @MTCCode
// //       `;
// //     } else {
// //       // Generate INSERT string
// //       const cols = equipmentCols.map(c => `[${c}]`).join(', ');
// //       const vals = equipmentCols.map(c => `@${c.replace(/[^a-zA-Z0-9]/g, '')}`).join(', ');
      
// //       query = `
// //         INSERT INTO [MTCJharkhand].[dbo].[MTCEquipment] 
// //         (MTCCode, LastUpdated, ${cols})
// //         VALUES (@MTCCode, @LastUpdated, ${vals})
// //       `;
// //     }

// //     await request.query(query);
// //     return { success: true, message: exists ? 'Equipment Updated' : 'Equipment Added' };

// //   } catch (err) {
// //     console.error('❌ Error saving Equipment data:', err);
// //     throw err;
// //   }
// // }


// import sql from 'mssql';

// // ==========================================
// // 1. TYPE DEFINITIONS
// // ==========================================

// export interface ChildData {
//   SamNo: string;
//   MTCCode: string; 
//   AtId: number;
//   RefererId: number;
//   ChildName: string;
//   MotherName: string;
//   FatherName: string;
//   MobileNumber: string;
//   BPLNo?: string;
//   DateofBirth: string | Date;
//   GenderId: number;
//   CastId: number;
//   Address: string;
//   DistrictId: string | number;
//   BlockId: string | number;
//   ICDSId: string | number;
//   AnganwadiId: string | number;
//   VillageName: string;
//   AdmissionDate: string | Date;
//   AdmissionWeight: number;
//   AdmissionHeight: number;
//   AdmissionZScore: number;
//   AdmissionEdema: number;
//   AdmissionMuac: number;
//   AdmissionAppetite: number;
//   BreastFeeding: number;
//   ComplementaryFeeding: number;
//   MedicalComplication?: string;
//   RegistrationImage?: string;
// }

// export interface DailyWeightData {
//   Rid: number;
//   SamNo: string;
//   MTCCode: string;
//   [key: string]: any; 
// }

// export interface DischargeData {
//   SamNo: string;
//   DischargeDate: string | Date;
//   DischargeWeight: number;
//   DischargeHeight: number;
//   DischargeMuac: number;
//   DischargeEdema: number;
//   ExitIndicator: number;
//   IFAToMotherTablet: number;
//   MotherWages: number;
//   IFAToMotherSyrup: number;
//   // Optional fields
//   HemoglobinMother?: number;
//   DischargeImage?: string | null;
//   TotalStay?: number | null;
//   MinimumWeight?: number | null;
// }

// export interface FollowUpData {
//   Rid?: number;
//   SamNo: string;
//   MTCCode?: string;
//   MotherName?: string;
//   DischargeDate?: string | Date;

//   // First Follow Up
//   FirstFollowUpDate?: string | Date;
//   FirstFollowUpDoneOn?: string | Date;
//   FirstFollowUpWeight?: number;
//   FirstFollowUpHeight?: number;
//   FirstFollowUpMUAC?: number;
//   FirstFollowUpZscore?: number;
//   FirstFollowUpMotherBP?: string;
//   FirstFollowUpMotherWeight?: number;
//   FirstFollowUpMotherHB?: number;

//   // Second Follow Up
//   SecondFollowUpDate?: string | Date;
//   SecondFollowUpDoneOn?: string | Date;
//   SecondFollowUpWeight?: number;
//   SecondFollowUpHeight?: number;
//   SecondFollowUpMUAC?: number;
//   SecondFollowUpZscore?: number;
//   SecondFollowUpMotherBP?: string;
//   SecondFollowUpMotherWeight?: number;
//   SecondFollowUpMotherHB?: number;

//   // Third Follow Up
//   ThirdFollowUpDate?: string | Date;
//   ThirdFollowUpDoneOn?: string | Date;
//   ThirdFollowUpWeight?: number;
//   ThirdFollowUpHeight?: number;
//   ThirdFollowUpMUAC?: number;
//   ThirdFollowUpZscore?: number;
//   ThirdFollowUpMotherBP?: string;
//   ThirdFollowUpMotherWeight?: number;
//   ThirdFollowUpMotherHB?: number;

//   // Fourth Follow Up (Matches "Fourt" spelling in DB)
//   FourthFollowUpDate?: string | Date;
//   FourtFollowUpDoneOn?: string | Date;
//   FourtFollowUpWeight?: number;
//   FourtFollowUpHeight?: number;
//   FourtFollowUpMUAC?: number;
//   FourtFollowUpZscore?: number;
//   FourtFollowUpMotherBP?: string;
//   FourtFollowUpMotherWeight?: number;
//   FourtFollowUpMotherHB?: number;
// }

// export interface DischargeListChild {
//   SamNo: string;
//   MTCCode: string;
//   ChildName: string;
//   FatherName: string;
//   MotherName: string;
//   DateofBirth: string | Date;
//   AdmissionWeight: number;
//   AdmissionHeight: number;
//   AdmissionDate: string | Date;
// }

// export interface EquipmentData {
//   Rid?: number;
//   MTCCode: string;
//   LastUpdated?: string | Date;
  
//   // Status Columns (0 or 1, or Quantity)
//   DigitalWeighingScaleWorking?: number;
//   DigitalWeighingScaleNotworking?: number;
//   StadiometerWorking?: number;
//   StadiometerNotWorking?: number;
//   InfantometerWroking?: number; // Matches DB typo
//   InfantometerNotWroking?: number; // Matches DB typo
//   MUACTapeAvailable?: number;
//   WeingScalesWorking?: number; // Matches DB typo
//   WeingScalesNotworking?: number;
//   ClockWorking?: number;
//   ClockNotWorking?: number;
//   CalculatorWorking?: number;
//   CalculatorNotWorking?: number;
//   SAMChartAvailable?: number;
//   SAMRegisterAvailable?: number;
//   CameraWorking?: number;
//   CameraNotWorking?: number;
//   FileAvailable?: number;
//   AlmiraRakeAvailable?: number;
//   AlmiraAvailable?: number;
//   ProtocolPosterAvailable?: number;
//   MarkerAvailable?: number;
//   WhiteBoardAvailable?: number;
//   DisplayBoardAvailable?: number;
//   TabWorking?: number;
//   TabNotWorking?: number;
//   ThermometersWorking?: number;
//   ThermometersNotWorking?: number;
//   ResuscitationEquipmentAval?: number;
//   "NGTube6/8Available"?: number; 
//   SuctionEquipmentWorking?: number;
//   SuctionEquipmentNotWorking?: number;
//   BloodTransfusionKitAval?: number;
//   HbMeterWorking?: number;
//   HbMeterNotWorking?: number;
//   GlucometerWorking?: number;
//   GlucometerNotWorking?: number;
//   BedWorking?: number;
//   BedNotWorking?: number;
//   SideTableWorking?: number;
//   SideTableNotWorking?: number;
//   IVStandWorking?: number;
//   IVStandNotWorking?: number;
//   RoomHeaterWorking?: number;
//   RoomHeaterNotWorking?: number;
//   CoolerACWorking?: number;
//   CoolerACNotWorking?: number;
//   FanWorking?: number;
//   FanNotWorking?: number;
//   TabaleChairWorking?: number; // Matches DB typo
//   TabaleChairNotWorking?: number; // Matches DB typo
//   DustbinAvailable?: number;
//   ShoeRackAvailable?: number;
//   TVWardandPlayArea?: number;
//   InverterWorking?: number;
//   InverterNotWorking?: number;
//   ToysAvailable?: number;
//   NutritionCousellingFlipBooks?: number;
//   WashingMachineWorking?: number;
//   WashingMachineNotWorking?: number;
//   GeyserWorking?: number;
//   GeyserNotWorking?: number;
//   ComputerWorking?: number;
//   ComputerNotWorking?: number;
//   PrinterWorking?: number;
//   PrinterNotWorking?: number;
//   BedSeatAvailable?: number;
//   MedicineTrayAvailable?: number;
//   curtansAvailable?: number;
//   TubelightWorking?: number;
//   TubelightNotWorking?: number;
//   CookingGasAvailable?: number;
//   DietaryScaleAvailable?: number;
//   MeasuringJarAvailable?: number;
//   ElectricMixerBlendeAvailable?: number;
//   WaterFilterROAvailable?: number;
//   RefrigeratorAvailable?: number;
//   UtensilforKitchenAvailable?: number;
//   MassacringCupGlassSpoon?: number; // Matches DB typo
//   PressercookerAvailable?: number; // Matches DB typo
//   SteelCacontnerAvailable?: number; // Matches DB typo
// }

// // Bed Occupancy Interface
// export interface BedOccupancyData {
//   Rid?: number;
//   MTCCode: string;
//   BedSanctioned: number;
//   UtilizedBed: number;
//   RecordDate: string | Date;
//   BedOccupency: number; // Matches DB Column spelling 'Occupency'
// }

// // ==========================================
// // 2. DB CONFIGURATION
// // ==========================================

// const config: sql.config = {
//   user: process.env.DB_USER!,
//   password: process.env.DB_PASSWORD!,
//   server: process.env.DB_SERVER!,
//   port: parseInt(process.env.DB_PORT || '1433'),
//   database: process.env.DB_NAME!,
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//     enableArithAbort: true,
//   },
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000
//   }
// };

// // ==========================================
// // 3. SINGLETON CONNECTION POOL
// // ==========================================

// let pool: sql.ConnectionPool | null = null;

// export async function getDBConnection() {
//   try {
//     if (pool && pool.connected) {
//       return pool;
//     }
//     pool = await sql.connect(config);
//     return pool;
//   } catch (err) {
//     console.error('❌ Database Connection Failed:', err);
//     throw err;
//   }
// }

// // ==========================================
// // 4. HELPER UTILS
// // ==========================================

// const parseSafeInt = (val: any): number | null => {
//   if (!val) return null;
//   if (typeof val === 'number') return val;
//   const parsed = parseInt(val, 10);
//   return isNaN(parsed) ? null : parsed;
// };

// // ==========================================
// // 5. FETCH FUNCTIONS (CORE DATA)
// // ==========================================

// export async function getChildrenFromDB() {
//   try {
//     const db = await getDBConnection();
//     const result = await db.request().query(`
//       SELECT 
//         SamNo, MTCCode, ChildName, MotherName, FatherName, 
//         MobileNumber, DateofBirth, AdmissionDate, AdmissionWeight, 
//         AdmissionHeight, DistrictId, BlockId, VillageName
//       FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
//       ORDER BY AdmissionDate DESC
//     `);
//     return result.recordset;
//   } catch (err) {
//     console.error('❌ Fetch Children Error:', err);
//     throw err;
//   }
// }

// export async function getDischargeList() {
//   try {
//     const db = await getDBConnection();
//     // We filter by DischargeDate IS NULL to only show currently admitted children
//     const query = `
//       SELECT 
//         SamNo, 
//         MTCCode, 
//         ChildName, 
//         FatherName, 
//         MotherName, 
//         DateofBirth, 
//         AdmissionWeight, 
//         AdmissionHeight, 
//         AdmissionDate
//       FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
//       WHERE DischargeDate IS NULL
//       ORDER BY AdmissionDate DESC
//     `;
//     const result = await db.request().query(query);
//     return result.recordset as DischargeListChild[];
//   } catch (err) {
//     console.error('❌ Error fetching discharge list:', err);
//     throw err;
//   }
// }

// export async function getDailyWeights(samNo: string) {
//   try {
//     const db = await getDBConnection();
//     const result = await db.request()
//       .input('SamNo', sql.NVarChar, samNo)
//       .query(`
//         SELECT * FROM [MTCJharkhand].[dbo].[MTCSAMDailyWeight] 
//         WHERE SamNo = @SamNo
//       `);
    
//     return result.recordset[0] || null;
//   } catch (err) {
//     console.error('❌ Fetch Weight Error:', err);
//     throw err;
//   }
// }

// export async function getChildBySamNo(samNo: string) {
//   try {
//     const db = await getDBConnection();
//     const result = await db.request()
//       .input('SamNo', sql.NVarChar, samNo)
//       .query(`
//         SELECT TOP 1 
//           SamNo, MTCCode, ChildName, MotherName, FatherName, 
//           AdmissionWeight, AdmissionHeight, AdmissionMuac, 
//           AdmissionEdema, AdmissionDate, DateofBirth
//         FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
//         WHERE SamNo = @SamNo
//       `);
//     return result.recordset[0] || null;
//   } catch (err) {
//     console.error('❌ Error fetching child:', err);
//     throw err;
//   }
// }

// export async function getFollowUpData(samNo: string) {
//   try {
//     const db = await getDBConnection();
//     const result = await db.request()
//       .input('SamNo', sql.NVarChar, samNo)
//       .query(`
//         SELECT TOP 1 * FROM [MTCJharkhand].[dbo].[MTCFollowUp] 
//         WHERE SamNo = @SamNo
//       `);
//     return result.recordset[0] as FollowUpData || null;
//   } catch (err) {
//     console.error('❌ Error fetching FollowUp data:', err);
//     throw err;
//   }
// }

// export async function getEquipmentData(mtcCode: string) {
//   try {
//     const db = await getDBConnection();
//     const result = await db.request()
//       .input('MTCCode', sql.NVarChar, mtcCode)
//       .query(`
//         SELECT TOP 1 * FROM [MTCJharkhand].[dbo].[MTCEquipment] 
//         WHERE MTCCode = @MTCCode
//       `);
//     return result.recordset[0] as EquipmentData || null;
//   } catch (err) {
//     console.error('❌ Error fetching Equipment Data:', err);
//     throw err;
//   }
// }

// // Fetch Bed Occupancy (Latest)
// export async function getBedOccupancy(mtcCode: string) {
//   try {
//     const db = await getDBConnection();
//     const result = await db.request()
//       .input('MTCCode', sql.NVarChar, mtcCode)
//       .query(`
//         SELECT TOP 1 
//           [MTCCode],
//           [BedSanctioned],
//           [UtilizedBed],
//           [RecordDate],
//           [BedOccupency]
//         FROM [MTCJharkhand].[dbo].[MTCBedOccupency]
//         WHERE MTCCode = @MTCCode
//         ORDER BY RecordDate DESC
//       `);
//     return result.recordset[0] as BedOccupancyData || null;
//   } catch (err) {
//     console.error('❌ Error fetching Bed Occupancy:', err);
//     throw err;
//   }
// }

// // NEW: Fetch all Bed Occupancy records for a specific year (For the Table)
// export async function getBedOccupancyHistory(mtcCode: string, year: number) {
//   try {
//     const db = await getDBConnection();
//     const result = await db.request()
//       .input('MTCCode', sql.NVarChar, mtcCode)
//       .input('Year', sql.Int, year)
//       .query(`
//         SELECT 
//           [Rid] as id,
//           [MTCCode],
//           [BedSanctioned],
//           [UtilizedBed],
//           [RecordDate] as date,
//           [BedOccupency] as bedOccupancyPercentage
//         FROM [MTCJharkhand].[dbo].[MTCBedOccupency]
//         WHERE MTCCode = @MTCCode 
//         AND YEAR(RecordDate) = @Year
//         ORDER BY RecordDate ASC
//       `);
//     return result.recordset;
//   } catch (err) {
//     console.error('❌ Error fetching Bed Occupancy History:', err);
//     throw err;
//   }
// }

// // ==========================================
// // 6. REFERENCE DATA FETCHERS (DROPDOWNS)
// // ==========================================

// export async function getGenderList() {
//   try {
//     const db = await getDBConnection();
//     const result = await db.request().query(`SELECT [GenderId], [GenderName] FROM [MTCJharkhand].[dbo].[MTCGender]`);
//     return result.recordset;
//   } catch (err) { console.error('Error fetching Genders', err); throw err; }
// }

// export async function getCastList() {
//   try {
//     const db = await getDBConnection();
//     const result = await db.request().query(`SELECT [CastId], [CastName] FROM [MTCJharkhand].[dbo].[MTCCasts]`);
//     return result.recordset;
//   } catch (err) { console.error('Error fetching Casts', err); throw err; }
// }

// export async function getDistrictList() {
//   try {
//     const db = await getDBConnection();
//     const result = await db.request().query(`SELECT [DistrictId], [DistrictCode], [DistrictName] FROM [MTCJharkhand].[dbo].[MTCDistricts] ORDER BY [DistrictName] ASC`);
//     return result.recordset;
//   } catch (err) { console.error('Error fetching Districts', err); throw err; }
// }

// export async function getBlockList(districtId?: number | string) {
//   try {
//     const db = await getDBConnection();
//     let query = `SELECT [BlockId], [BlockName], [DistrictId] FROM [MTCJharkhand].[dbo].[MTCBlock]`;
//     const request = db.request();
//     if (districtId) {
//       query += ` WHERE [DistrictId] = @DistrictId`;
//       request.input('DistrictId', sql.Int, districtId);
//     }
//     query += ` ORDER BY [BlockName] ASC`;
//     const result = await request.query(query);
//     return result.recordset;
//   } catch (err) { console.error('Error fetching Block List', err); throw err; }
// }

// export async function getICDSList(districtId?: number | string) {
//   try {
//     const db = await getDBConnection();
//     let query = `SELECT [ICDSId], [ICDSName], [DistrictId] FROM [MTCJharkhand].[dbo].[MTCIcds]`;
//     const request = db.request();
//     if (districtId) {
//       query += ` WHERE [DistrictId] = @DistrictId`;
//       request.input('DistrictId', sql.Int, districtId);
//     }
//     query += ` ORDER BY [ICDSName] ASC`;
//     const result = await request.query(query);
//     return result.recordset;
//   } catch (err) { console.error('Error fetching ICDS List', err); throw err; }
// }

// export async function getAnganwadiList(icdsId?: number | string) {
//   try {
//     const db = await getDBConnection();
//     let query = `SELECT [AnganwadiId], [AnganwadiName], [ICDSId] FROM [MTCJharkhand].[dbo].[MTCAnganwadi]`;
//     const request = db.request();
//     if (icdsId) {
//       query += ` WHERE [ICDSId] = @ICDSId`;
//       request.input('ICDSId', sql.Int, icdsId);
//     }
//     query += ` ORDER BY [AnganwadiName] ASC`;
//     const result = await request.query(query);
//     return result.recordset;
//   } catch (err) { console.error('Error fetching Anganwadi List', err); throw err; }
// }

// // ==========================================
// // 7. GENERATE NEXT SAM NUMBER
// // ==========================================

// export async function generateNextSamNumber() {
//   try {
//     const db = await getDBConnection();
    
//     // 1. Fetch Dynamic Prefix
//     const mtcResult = await db.request().query(`SELECT TOP 1 MTCCode FROM [MTCJharkhand].[dbo].[MTCCenter]`);
//     let mtcPrefix = "JH/WSB/CBS"; 
//     if (mtcResult.recordset.length > 0 && mtcResult.recordset[0].MTCCode) {
//        mtcPrefix = mtcResult.recordset[0].MTCCode;
//     }

//     // 2. Find last record
//     const searchPattern = `${mtcPrefix}/%`;
//     const result = await db.request()
//       .input('Pattern', sql.NVarChar, searchPattern)
//       .query(`
//         SELECT TOP 1 SamNo 
//         FROM [MTCJharkhand].[dbo].[MTCSAMChildren] 
//         WHERE SamNo LIKE @Pattern
//         ORDER BY LEN(SamNo) DESC, SamNo DESC
//       `);

//     const lastRecord = result.recordset[0];

//     // 3. Generate Number
//     if (!lastRecord || !lastRecord.SamNo) {
//       return `${mtcPrefix}/1001`;
//     }

//     const parts = lastRecord.SamNo.split('/');
//     const lastNumStr = parts[parts.length - 1]; 
//     const lastNum = parseInt(lastNumStr, 10);

//     if (isNaN(lastNum)) return `${mtcPrefix}/${Date.now().toString().slice(-4)}`; 

//     const nextNum = lastNum + 1;
//     return `${mtcPrefix}/${nextNum}`;

//   } catch (err) {
//     console.error('❌ Error generating SAM No:', err);
//     return `JH/ERROR/${Math.floor(Math.random() * 1000)}`; 
//   }
// }

// // ==========================================
// // 8. INSERT / UPDATE FUNCTIONS
// // ==========================================

// export async function updateDailyWeight(samNo: string, mtcCode: string, day: number, weight: number) {
//   try {
//     if (day < 0 || day > 59) throw new Error("Day must be between 0 and 59");

//     const db = await getDBConnection();
//     const checkRow = await db.request()
//       .input('SamNo', sql.NVarChar, samNo)
//       .query(`SELECT count(*) as count FROM [MTCJharkhand].[dbo].[MTCSAMDailyWeight] WHERE SamNo = @SamNo`);

//     const exists = checkRow.recordset[0].count > 0;
//     const dayColumn = `Day${day}`;

//     if (exists) {
//       await db.request()
//         .input('SamNo', sql.NVarChar, samNo)
//         .input('Weight', sql.Decimal(5, 2), weight)
//         .query(`UPDATE [MTCJharkhand].[dbo].[MTCSAMDailyWeight] SET ${dayColumn} = @Weight WHERE SamNo = @SamNo`);
//     } else {
//       await db.request()
//         .input('SamNo', sql.NVarChar, samNo)
//         .input('MTCCode', sql.NVarChar, mtcCode)
//         .input('Weight', sql.Decimal(5, 2), weight)
//         .query(`INSERT INTO [MTCJharkhand].[dbo].[MTCSAMDailyWeight] (SamNo, MTCCode, ${dayColumn}) VALUES (@SamNo, @MTCCode, @Weight)`);
//     }
//     return { success: true, message: `Updated ${dayColumn}` };
//   } catch (err) { console.error(`Error updating weight:`, err); throw err; }
// }

// export async function registerChildInDB(childData: ChildData) {
//   try {
//     const db = await getDBConnection();
    
//     // Fallback MTCCode logic
//     let realMTCCode = childData.MTCCode;
//     try {
//         const mtcQuery = await db.request().query(`SELECT TOP 1 MTCCode FROM [MTCJharkhand].[dbo].[MTCCenter]`);
//         if (mtcQuery.recordset.length > 0 && mtcQuery.recordset[0].MTCCode) {
//             realMTCCode = mtcQuery.recordset[0].MTCCode;
//         }
//     } catch(e) { console.warn("Using provided MTCCode as fallback."); }

//     const transaction = new sql.Transaction(db);
//     await transaction.begin();

//     try {
//       const request = new sql.Request(transaction);
//       const queryChildren = `
//         INSERT INTO [MTCJharkhand].[dbo].[MTCSAMChildren] (
//           SamNo, MTCCode, AtId, RefererId, ChildName, MotherName, FatherName, 
//           MobileNumber, BPLNo, DateofBirth, GenderId, CastId, Address, 
//           DistrictId, BlockId, ICDSId, AnganwadiId, VillageName, AdmissionDate, 
//           AdmissionWeight, AdmissionHeight, AdmissionZScore, AdmissionEdema, 
//           AdmissionMuac, AdmissionAppetite, BreastFeeding, ComplementaryFeeding, 
//           MedicalComplication, RegistrationImage, DischargeDate, DischargeWeight, 
//           DischargeHeight, DischargeEdema, DischargeMuac, DischargeZScore, 
//           ExitIndicator, IFAToMotherTablet, MotherWages, IFAToMotherSyrup, 
//           DischargeStatus, DischargeImage, MedicalTrasfer
//         )
//         VALUES (
//           @SamNo, @MTCCode, @AtId, @RefererId, @ChildName, @MotherName, @FatherName, 
//           @MobileNumber, @BPLNo, @DateofBirth, @GenderId, @CastId, @Address, 
//           @DistrictId, @BlockId, @ICDSId, @AnganwadiId, @VillageName, @AdmissionDate, 
//           @AdmissionWeight, @AdmissionHeight, @AdmissionZScore, @AdmissionEdema, 
//           @AdmissionMuac, @AdmissionAppetite, @BreastFeeding, @ComplementaryFeeding, 
//           @MedicalComplication, @RegistrationImage, NULL, NULL, 
//           NULL, NULL, NULL, NULL, 
//           NULL, NULL, NULL, NULL, 
//           NULL, NULL, NULL
//         )
//       `;

//       request.input('SamNo', sql.NVarChar, childData.SamNo);
//       request.input('MTCCode', sql.NVarChar, realMTCCode);
//       request.input('AtId', sql.Int, childData.AtId);
//       request.input('RefererId', sql.Int, childData.RefererId);
//       request.input('ChildName', sql.NVarChar, childData.ChildName);
//       request.input('MotherName', sql.NVarChar, childData.MotherName);
//       request.input('FatherName', sql.NVarChar, childData.FatherName);
//       request.input('MobileNumber', sql.NVarChar, childData.MobileNumber);
//       request.input('BPLNo', sql.NVarChar, childData.BPLNo || null);
//       request.input('DateofBirth', sql.Date, childData.DateofBirth);
//       request.input('GenderId', sql.Int, childData.GenderId);
//       request.input('CastId', sql.Int, childData.CastId);
//       request.input('Address', sql.NVarChar, childData.Address);
//       request.input('DistrictId', sql.Int, parseSafeInt(childData.DistrictId));
//       request.input('BlockId', sql.Int, parseSafeInt(childData.BlockId));
//       request.input('ICDSId', sql.Int, parseSafeInt(childData.ICDSId)); 
//       request.input('AnganwadiId', sql.Int, parseSafeInt(childData.AnganwadiId));
//       request.input('VillageName', sql.NVarChar, childData.VillageName);
//       request.input('AdmissionDate', sql.DateTime, childData.AdmissionDate);
//       request.input('AdmissionWeight', sql.Decimal(5,2), childData.AdmissionWeight);
//       request.input('AdmissionHeight', sql.Decimal(5,2), childData.AdmissionHeight);
//       request.input('AdmissionZScore', sql.Decimal(5,2), childData.AdmissionZScore);
//       request.input('AdmissionEdema', sql.Int, childData.AdmissionEdema);
//       request.input('AdmissionMuac', sql.Decimal(5,2), childData.AdmissionMuac);
//       request.input('AdmissionAppetite', sql.Int, childData.AdmissionAppetite);
//       request.input('BreastFeeding', sql.Int, childData.BreastFeeding);
//       request.input('ComplementaryFeeding', sql.Int, childData.ComplementaryFeeding);
//       request.input('MedicalComplication', sql.NVarChar, childData.MedicalComplication || null);
//       request.input('RegistrationImage', sql.NVarChar(sql.MAX), childData.RegistrationImage || null);

//       await request.query(queryChildren);

//       const requestWeights = new sql.Request(transaction);
//       requestWeights.input('SamNo', sql.NVarChar, childData.SamNo);
//       requestWeights.input('MTCCode', sql.NVarChar, realMTCCode);
//       requestWeights.input('Day0', sql.Decimal(5,2), childData.AdmissionWeight);
//       await requestWeights.query(`INSERT INTO [MTCJharkhand].[dbo].[MTCSAMDailyWeight] (SamNo, MTCCode, Day0) VALUES (@SamNo, @MTCCode, @Day0)`);

//       await transaction.commit();
//       return { success: true };

//     } catch (err) {
//       await transaction.rollback();
//       throw err;
//     }
//   } catch (err) { console.error('❌ Insert Error:', err); throw err; }
// }

// export async function updateDischargeChild(data: DischargeData) {
//   try {
//     const db = await getDBConnection();
//     const isMedicalTransfer = data.ExitIndicator === 3 ? 1 : 0;
//     const dischargeStatus = 1;

//     const query = `
//       UPDATE [MTCJharkhand].[dbo].[MTCSAMChildren]
//       SET 
//         DischargeDate = @DischargeDate,
//         DischargeWeight = @DischargeWeight,
//         DischargeHeight = @DischargeHeight,
//         DischargeEdema = @DischargeEdema,
//         DischargeMuac = @DischargeMuac,
//         ExitIndicator = @ExitIndicator,
//         IFAToMotherTablet = @IFAToMotherTablet,
//         MotherWages = @MotherWages,
//         IFAToMotherSyrup = @IFAToMotherSyrup,
//         DischargeImage = @DischargeImage,
//         MedicalTrasfer = @MedicalTrasfer,
//         DischargeStatus = @DischargeStatus
//       WHERE SamNo = @SamNo
//     `;

//     const request = db.request();
    
//     request.input('SamNo', sql.NVarChar, data.SamNo);
//     request.input('DischargeDate', sql.Date, new Date(data.DischargeDate));
//     request.input('DischargeWeight', sql.Decimal(5, 2), data.DischargeWeight);
//     request.input('DischargeHeight', sql.Decimal(5, 2), data.DischargeHeight);
//     request.input('DischargeMuac', sql.Decimal(5, 2), data.DischargeMuac);
//     request.input('DischargeEdema', sql.Int, data.DischargeEdema);
//     request.input('ExitIndicator', sql.Int, data.ExitIndicator);
//     request.input('IFAToMotherTablet', sql.Int, data.IFAToMotherTablet);
//     request.input('MotherWages', sql.Int, data.MotherWages);
//     request.input('IFAToMotherSyrup', sql.Int, data.IFAToMotherSyrup);
//     request.input('DischargeImage', sql.NVarChar(sql.MAX), data.DischargeImage ?? null);
//     request.input('MedicalTrasfer', sql.Int, isMedicalTransfer);
//     request.input('DischargeStatus', sql.Int, dischargeStatus);

//     await request.query(query);
//     return { success: true };

//   } catch (err) {
//     console.error('❌ Error updating discharge record:', err);
//     throw err;
//   }
// }

// export async function saveFollowUpData(data: FollowUpData) {
//   try {
//     const db = await getDBConnection();
    
//     const checkRecord = await db.request()
//       .input('SamNo', sql.NVarChar, data.SamNo)
//       .query(`SELECT COUNT(*) as count FROM [MTCJharkhand].[dbo].[MTCFollowUp] WHERE SamNo = @SamNo`);

//     const exists = checkRecord.recordset[0].count > 0;
//     const request = db.request();

//     request.input('SamNo', sql.NVarChar, data.SamNo);
//     request.input('MTCCode', sql.NVarChar, data.MTCCode || null);
//     request.input('MotherName', sql.NVarChar, data.MotherName || null);
//     request.input('DischargeDate', sql.Date, data.DischargeDate ? new Date(data.DischargeDate) : null);

//     const bindFollowUpInputs = (prefix: string, source: any) => {
//       const dbPrefix = prefix === "Fourth" ? "Fourt" : prefix; 
//       request.input(`${prefix}FollowUpDate`, sql.Date, source[`${prefix}FollowUpDate`] ? new Date(source[`${prefix}FollowUpDate`]) : null);
//       request.input(`${dbPrefix}FollowUpDoneOn`, sql.Date, source[`${dbPrefix}FollowUpDoneOn`] ? new Date(source[`${dbPrefix}FollowUpDoneOn`]) : null);
//       request.input(`${dbPrefix}FollowUpWeight`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpWeight`] || null);
//       request.input(`${dbPrefix}FollowUpHeight`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpHeight`] || null);
//       request.input(`${dbPrefix}FollowUpMUAC`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpMUAC`] || null);
//       request.input(`${dbPrefix}FollowUpZscore`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpZscore`] || null);
//       request.input(`${dbPrefix}FollowUpMotherBP`, sql.NVarChar, source[`${dbPrefix}FollowUpMotherBP`] || null);
//       request.input(`${dbPrefix}FollowUpMotherWeight`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpMotherWeight`] || null);
//       request.input(`${dbPrefix}FollowUpMotherHB`, sql.Decimal(5, 2), source[`${dbPrefix}FollowUpMotherHB`] || null);
//     };

//     bindFollowUpInputs('First', data);
//     bindFollowUpInputs('Second', data);
//     bindFollowUpInputs('Third', data);
    
//     // Fourth manual binding
//     request.input('FourthFollowUpDate', sql.Date, data.FourthFollowUpDate ? new Date(data.FourthFollowUpDate) : null);
//     request.input('FourtFollowUpDoneOn', sql.Date, data.FourtFollowUpDoneOn ? new Date(data.FourtFollowUpDoneOn) : null);
//     request.input('FourtFollowUpWeight', sql.Decimal(5, 2), data.FourtFollowUpWeight || null);
//     request.input('FourtFollowUpHeight', sql.Decimal(5, 2), data.FourtFollowUpHeight || null);
//     request.input('FourtFollowUpMUAC', sql.Decimal(5, 2), data.FourtFollowUpMUAC || null);
//     request.input('FourtFollowUpZscore', sql.Decimal(5, 2), data.FourtFollowUpZscore || null);
//     request.input('FourtFollowUpMotherBP', sql.NVarChar, data.FourtFollowUpMotherBP || null);
//     request.input('FourtFollowUpMotherWeight', sql.Decimal(5, 2), data.FourtFollowUpMotherWeight || null);
//     request.input('FourtFollowUpMotherHB', sql.Decimal(5, 2), data.FourtFollowUpMotherHB || null);

//     let query = '';

//     if (exists) {
//       query = `
//         UPDATE [MTCJharkhand].[dbo].[MTCFollowUp]
//         SET 
//           MTCCode = @MTCCode, MotherName = @MotherName, DischargeDate = @DischargeDate,
//           FirstFollowUpDate = @FirstFollowUpDate, FirstFollowUpDoneOn = @FirstFollowUpDoneOn, FirstFollowUpWeight = @FirstFollowUpWeight, FirstFollowUpHeight = @FirstFollowUpHeight, FirstFollowUpMUAC = @FirstFollowUpMUAC, FirstFollowUpZscore = @FirstFollowUpZscore, FirstFollowUpMotherBP = @FirstFollowUpMotherBP, FirstFollowUpMotherWeight = @FirstFollowUpMotherWeight, FirstFollowUpMotherHB = @FirstFollowUpMotherHB,
//           SecondFollowUpDate = @SecondFollowUpDate, SecondFollowUpDoneOn = @SecondFollowUpDoneOn, SecondFollowUpWeight = @SecondFollowUpWeight, SecondFollowUpHeight = @SecondFollowUpHeight, SecondFollowUpMUAC = @SecondFollowUpMUAC, SecondFollowUpZscore = @SecondFollowUpZscore, SecondFollowUpMotherBP = @SecondFollowUpMotherBP, SecondFollowUpMotherWeight = @SecondFollowUpMotherWeight, SecondFollowUpMotherHB = @SecondFollowUpMotherHB,
//           ThirdFollowUpDate = @ThirdFollowUpDate, ThirdFollowUpDoneOn = @ThirdFollowUpDoneOn, ThirdFollowUpWeight = @ThirdFollowUpWeight, ThirdFollowUpHeight = @ThirdFollowUpHeight, ThirdFollowUpMUAC = @ThirdFollowUpMUAC, ThirdFollowUpZscore = @ThirdFollowUpZscore, ThirdFollowUpMotherBP = @ThirdFollowUpMotherBP, ThirdFollowUpMotherWeight = @ThirdFollowUpMotherWeight, ThirdFollowUpMotherHB = @ThirdFollowUpMotherHB,
//           FourthFollowUpDate = @FourthFollowUpDate, FourtFollowUpDoneOn = @FourtFollowUpDoneOn, FourtFollowUpWeight = @FourtFollowUpWeight, FourtFollowUpHeight = @FourtFollowUpHeight, FourtFollowUpMUAC = @FourtFollowUpMUAC, FourtFollowUpZscore = @FourtFollowUpZscore, FourtFollowUpMotherBP = @FourtFollowUpMotherBP, FourtFollowUpMotherWeight = @FourtFollowUpMotherWeight, FourtFollowUpMotherHB = @FourtFollowUpMotherHB
//         WHERE SamNo = @SamNo
//       `;
//     } else {
//       query = `
//         INSERT INTO [MTCJharkhand].[dbo].[MTCFollowUp] (
//           SamNo, MTCCode, MotherName, DischargeDate,
//           FirstFollowUpDate, FirstFollowUpDoneOn, FirstFollowUpWeight, FirstFollowUpHeight, FirstFollowUpMUAC, FirstFollowUpZscore, FirstFollowUpMotherBP, FirstFollowUpMotherWeight, FirstFollowUpMotherHB,
//           SecondFollowUpDate, SecondFollowUpDoneOn, SecondFollowUpWeight, SecondFollowUpHeight, SecondFollowUpMUAC, SecondFollowUpZscore, SecondFollowUpMotherBP, SecondFollowUpMotherWeight, SecondFollowUpMotherHB,
//           ThirdFollowUpDate, ThirdFollowUpDoneOn, ThirdFollowUpWeight, ThirdFollowUpHeight, ThirdFollowUpMUAC, ThirdFollowUpZscore, ThirdFollowUpMotherBP, ThirdFollowUpMotherWeight, ThirdFollowUpMotherHB,
//           FourthFollowUpDate, FourtFollowUpDoneOn, FourtFollowUpWeight, FourtFollowUpHeight, FourtFollowUpMUAC, FourtFollowUpZscore, FourtFollowUpMotherBP, FourtFollowUpMotherWeight, FourtFollowUpMotherHB
//         ) VALUES (
//           @SamNo, @MTCCode, @MotherName, @DischargeDate,
//           @FirstFollowUpDate, @FirstFollowUpDoneOn, @FirstFollowUpWeight, @FirstFollowUpHeight, @FirstFollowUpMUAC, @FirstFollowUpZscore, @FirstFollowUpMotherBP, @FirstFollowUpMotherWeight, @FirstFollowUpMotherHB,
//           @SecondFollowUpDate, @SecondFollowUpDoneOn, @SecondFollowUpWeight, @SecondFollowUpHeight, @SecondFollowUpMUAC, @SecondFollowUpZscore, @SecondFollowUpMotherBP, @SecondFollowUpMotherWeight, @SecondFollowUpMotherHB,
//           @ThirdFollowUpDate, @ThirdFollowUpDoneOn, @ThirdFollowUpWeight, @ThirdFollowUpHeight, @ThirdFollowUpMUAC, @ThirdFollowUpZscore, @ThirdFollowUpMotherBP, @ThirdFollowUpMotherWeight, @ThirdFollowUpMotherHB,
//           @FourthFollowUpDate, @FourtFollowUpDoneOn, @FourtFollowUpWeight, @FourtFollowUpHeight, @FourtFollowUpMUAC, @FourtFollowUpZscore, @FourtFollowUpMotherBP, @FourtFollowUpMotherWeight, @FourtFollowUpMotherHB
//         )
//       `;
//     }

//     await request.query(query);
//     return { success: true, message: exists ? 'FollowUp Updated' : 'FollowUp Created' };

//   } catch (err) {
//     console.error('❌ Error saving FollowUp data:', err);
//     throw err;
//   }
// }

// export async function saveEquipmentData(data: EquipmentData) {
//   try {
//     const db = await getDBConnection();
    
//     // Check if record exists
//     const checkRecord = await db.request()
//       .input('MTCCode', sql.NVarChar, data.MTCCode)
//       .query(`SELECT COUNT(*) as count FROM [MTCJharkhand].[dbo].[MTCEquipment] WHERE MTCCode = @MTCCode`);

//     const exists = checkRecord.recordset[0].count > 0;
//     const request = db.request();

//     // 1. Basic Inputs
//     request.input('MTCCode', sql.NVarChar, data.MTCCode);
//     request.input('LastUpdated', sql.DateTime, new Date());

//     // 2. List of all equipment columns (Matches SQL spelling)
//     const equipmentCols = [
//       "DigitalWeighingScaleWorking", "DigitalWeighingScaleNotworking", "StadiometerWorking", "StadiometerNotWorking",
//       "InfantometerWroking", "InfantometerNotWroking", "MUACTapeAvailable", "WeingScalesWorking", "WeingScalesNotworking",
//       "ClockWorking", "ClockNotWorking", "CalculatorWorking", "CalculatorNotWorking", "SAMChartAvailable",
//       "SAMRegisterAvailable", "CameraWorking", "CameraNotWorking", "FileAvailable", "AlmiraRakeAvailable",
//       "AlmiraAvailable", "ProtocolPosterAvailable", "MarkerAvailable", "WhiteBoardAvailable", "DisplayBoardAvailable",
//       "TabWorking", "TabNotWorking", "ThermometersWorking", "ThermometersNotWorking", "ResuscitationEquipmentAval",
//       "NGTube6/8Available", "SuctionEquipmentWorking", "SuctionEquipmentNotWorking", "BloodTransfusionKitAval",
//       "HbMeterWorking", "HbMeterNotWorking", "GlucometerWorking", "GlucometerNotWorking", "BedWorking", "BedNotWorking",
//       "SideTableWorking", "SideTableNotWorking", "IVStandWorking", "IVStandNotWorking", "RoomHeaterWorking",
//       "RoomHeaterNotWorking", "CoolerACWorking", "CoolerACNotWorking", "FanWorking", "FanNotWorking",
//       "TabaleChairWorking", "TabaleChairNotWorking", "DustbinAvailable", "ShoeRackAvailable", "TVWardandPlayArea",
//       "InverterWorking", "InverterNotWorking", "ToysAvailable", "NutritionCousellingFlipBooks", "WashingMachineWorking",
//       "WashingMachineNotWorking", "GeyserWorking", "GeyserNotWorking", "ComputerWorking", "ComputerNotWorking",
//       "PrinterWorking", "PrinterNotWorking", "BedSeatAvailable", "MedicineTrayAvailable", "curtansAvailable",
//       "TubelightWorking", "TubelightNotWorking", "CookingGasAvailable", "DietaryScaleAvailable", "MeasuringJarAvailable",
//       "ElectricMixerBlendeAvailable", "WaterFilterROAvailable", "RefrigeratorAvailable", "UtensilforKitchenAvailable",
//       "MassacringCupGlassSpoon", "PressercookerAvailable", "SteelCacontnerAvailable"
//     ];

//     // 3. Bind Inputs dynamically (stripping bad chars for @params)
//     equipmentCols.forEach(col => {
//       const paramName = col.replace(/[^a-zA-Z0-9]/g, '');
//       const value = data[col as keyof EquipmentData] !== undefined ? data[col as keyof EquipmentData] : 0;
//       request.input(paramName, sql.Int, value);
//     });

//     let query = '';

//     if (exists) {
//       // Generate UPDATE string
//       const updateSet = equipmentCols.map(col => {
//         const paramName = col.replace(/[^a-zA-Z0-9]/g, '');
//         return `[${col}] = @${paramName}`;
//       }).join(', ');
      
//       query = `
//         UPDATE [MTCJharkhand].[dbo].[MTCEquipment]
//         SET LastUpdated = @LastUpdated, ${updateSet}
//         WHERE MTCCode = @MTCCode
//       `;
//     } else {
//       // Generate INSERT string
//       const cols = equipmentCols.map(c => `[${c}]`).join(', ');
//       const vals = equipmentCols.map(c => `@${c.replace(/[^a-zA-Z0-9]/g, '')}`).join(', ');
      
//       query = `
//         INSERT INTO [MTCJharkhand].[dbo].[MTCEquipment] 
//         (MTCCode, LastUpdated, ${cols})
//         VALUES (@MTCCode, @LastUpdated, ${vals})
//       `;
//     }

//     await request.query(query);
//     return { success: true, message: exists ? 'Equipment Updated' : 'Equipment Added' };

//   } catch (err) {
//     console.error('❌ Error saving Equipment data:', err);
//     throw err;
//   } 
// }

// // Save Bed Occupancy
// export async function saveBedOccupancy(data: BedOccupancyData) {
//   try {
//     const db = await getDBConnection();
//     const request = db.request();

//     // 1. Bind Inputs
//     request.input('MTCCode', sql.NVarChar, data.MTCCode);
//     request.input('BedSanctioned', sql.Int, data.BedSanctioned);
//     request.input('UtilizedBed', sql.Int, data.UtilizedBed);
//     request.input('RecordDate', sql.DateTime, new Date(data.RecordDate));
//     request.input('BedOccupency', sql.Decimal(5, 2), data.BedOccupency);

//     // 2. Check if record exists for this Date AND MTCCode
//     const checkQuery = `
//       SELECT COUNT(*) as count 
//       FROM [MTCJharkhand].[dbo].[MTCBedOccupency] 
//       WHERE MTCCode = @MTCCode 
//       AND CAST(RecordDate AS DATE) = CAST(@RecordDate AS DATE)
//     `;
    
//     const checkResult = await db.request()
//       .input('MTCCode', sql.NVarChar, data.MTCCode)
//       .input('RecordDate', sql.DateTime, new Date(data.RecordDate))
//       .query(checkQuery);

//     const exists = checkResult.recordset[0].count > 0;

//     let query = '';

//     if (exists) {
//       // UPDATE existing record
//       query = `
//         UPDATE [MTCJharkhand].[dbo].[MTCBedOccupency]
//         SET 
//           BedSanctioned = @BedSanctioned,
//           UtilizedBed = @UtilizedBed,
//           BedOccupency = @BedOccupency,
//           RecordDate = @RecordDate
//         WHERE MTCCode = @MTCCode 
//         AND CAST(RecordDate AS DATE) = CAST(@RecordDate AS DATE)
//       `;
//     } else {
//       // INSERT new record
//       query = `
//         INSERT INTO [MTCJharkhand].[dbo].[MTCBedOccupency]
//         (MTCCode, BedSanctioned, UtilizedBed, RecordDate, BedOccupency)
//         VALUES
//         (@MTCCode, @BedSanctioned, @UtilizedBed, @RecordDate, @BedOccupency)
//       `;
//     }

//     await request.query(query);
//     return { success: true, message: exists ? 'Bed Occupancy Updated' : 'Bed Occupancy Added' };

//   } catch (err) {
//     console.error('❌ Error saving Bed Occupancy:', err);
//     throw err;
//   }
// }

import sql from 'mssql';

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================

export interface ChildData {
  SamNo: string;
  MTCCode: string;
  AtId: number;
  RefererId: number;
  ChildName: string;
  MotherName: string;
  FatherName: string;
  MobileNumber: string;
  BPLNo?: string;
  DateofBirth: string | Date;
  GenderId: number;
  CastId: number;
  Address: string;
  DistrictId: string | number;
  BlockId: string | number;
  ICDSId: string | number;
  AnganwadiId: string | number;
  VillageName: string;
  AdmissionDate: string | Date;
  AdmissionWeight: number;
  AdmissionHeight: number;
  AdmissionZScore: number;
  AdmissionEdema: number;
  AdmissionMuac: number;
  AdmissionAppetite: number;
  BreastFeeding: number;
  ComplementaryFeeding: number;
  MedicalComplication?: string;
  RegistrationImage?: string;
}

export interface DailyWeightData {
  Rid: number;
  SamNo: string;
  MTCCode: string;
  [key: string]: string | number | undefined | null; // Avoids 'any'
}

export interface DischargeData {
  SamNo: string;
  DischargeDate: string | Date;
  DischargeWeight: number;
  DischargeHeight: number;
  DischargeMuac: number;
  DischargeEdema: number;
  ExitIndicator: number;
  IFAToMotherTablet: number;
  MotherWages: number;
  IFAToMotherSyrup: number;
  // Optional fields
  HemoglobinMother?: number;
  DischargeImage?: string | null;
  TotalStay?: number | null;
  MinimumWeight?: number | null;
}

export interface FollowUpData {
  Rid?: number;
  SamNo: string;
  MTCCode?: string;
  MotherName?: string;
  DischargeDate?: string | Date;

  // First Follow Up
  FirstFollowUpDate?: string | Date;
  FirstFollowUpDoneOn?: string | Date;
  FirstFollowUpWeight?: number;
  FirstFollowUpHeight?: number;
  FirstFollowUpMUAC?: number;
  FirstFollowUpZscore?: number;
  FirstFollowUpMotherBP?: string;
  FirstFollowUpMotherWeight?: number;
  FirstFollowUpMotherHB?: number;

  // Second Follow Up
  SecondFollowUpDate?: string | Date;
  SecondFollowUpDoneOn?: string | Date;
  SecondFollowUpWeight?: number;
  SecondFollowUpHeight?: number;
  SecondFollowUpMUAC?: number;
  SecondFollowUpZscore?: number;
  SecondFollowUpMotherBP?: string;
  SecondFollowUpMotherWeight?: number;
  SecondFollowUpMotherHB?: number;

  // Third Follow Up
  ThirdFollowUpDate?: string | Date;
  ThirdFollowUpDoneOn?: string | Date;
  ThirdFollowUpWeight?: number;
  ThirdFollowUpHeight?: number;
  ThirdFollowUpMUAC?: number;
  ThirdFollowUpZscore?: number;
  ThirdFollowUpMotherBP?: string;
  ThirdFollowUpMotherWeight?: number;
  ThirdFollowUpMotherHB?: number;

  // Fourth Follow Up (Matches "Fourt" spelling in DB)
  FourthFollowUpDate?: string | Date;
  FourtFollowUpDoneOn?: string | Date;
  FourtFollowUpWeight?: number;
  FourtFollowUpHeight?: number;
  FourtFollowUpMUAC?: number;
  FourtFollowUpZscore?: number;
  FourtFollowUpMotherBP?: string;
  FourtFollowUpMotherWeight?: number;
  FourtFollowUpMotherHB?: number;
}

export interface DischargeListChild {
  SamNo: string;
  MTCCode: string;
  ChildName: string;
  FatherName: string;
  MotherName: string;
  DateofBirth: string | Date;
  AdmissionWeight: number;
  AdmissionHeight: number;
  AdmissionDate: string | Date;
}

export interface EquipmentData {
  Rid?: number;
  MTCCode: string;
  LastUpdated?: string | Date;

  // Status Columns (0 or 1, or Quantity)
  DigitalWeighingScaleWorking?: number;
  DigitalWeighingScaleNotworking?: number;
  StadiometerWorking?: number;
  StadiometerNotWorking?: number;
  InfantometerWroking?: number; // Matches DB typo
  InfantometerNotWroking?: number; // Matches DB typo
  MUACTapeAvailable?: number;
  WeingScalesWorking?: number; // Matches DB typo
  WeingScalesNotworking?: number;
  ClockWorking?: number;
  ClockNotWorking?: number;
  CalculatorWorking?: number;
  CalculatorNotWorking?: number;
  SAMChartAvailable?: number;
  SAMRegisterAvailable?: number;
  CameraWorking?: number;
  CameraNotWorking?: number;
  FileAvailable?: number;
  AlmiraRakeAvailable?: number;
  AlmiraAvailable?: number;
  ProtocolPosterAvailable?: number;
  MarkerAvailable?: number;
  WhiteBoardAvailable?: number;
  DisplayBoardAvailable?: number;
  TabWorking?: number;
  TabNotWorking?: number;
  ThermometersWorking?: number;
  ThermometersNotWorking?: number;
  ResuscitationEquipmentAval?: number;
  "NGTube6/8Available"?: number;
  SuctionEquipmentWorking?: number;
  SuctionEquipmentNotWorking?: number;
  BloodTransfusionKitAval?: number;
  HbMeterWorking?: number;
  HbMeterNotWorking?: number;
  GlucometerWorking?: number;
  GlucometerNotWorking?: number;
  BedWorking?: number;
  BedNotWorking?: number;
  SideTableWorking?: number;
  SideTableNotWorking?: number;
  IVStandWorking?: number;
  IVStandNotWorking?: number;
  RoomHeaterWorking?: number;
  RoomHeaterNotWorking?: number;
  CoolerACWorking?: number;
  CoolerACNotWorking?: number;
  FanWorking?: number;
  FanNotWorking?: number;
  TabaleChairWorking?: number; // Matches DB typo
  TabaleChairNotWorking?: number; // Matches DB typo
  DustbinAvailable?: number;
  ShoeRackAvailable?: number;
  TVWardandPlayArea?: number;
  InverterWorking?: number;
  InverterNotWorking?: number;
  ToysAvailable?: number;
  NutritionCousellingFlipBooks?: number;
  WashingMachineWorking?: number;
  WashingMachineNotWorking?: number;
  GeyserWorking?: number;
  GeyserNotWorking?: number;
  ComputerWorking?: number;
  ComputerNotWorking?: number;
  PrinterWorking?: number;
  PrinterNotWorking?: number;
  BedSeatAvailable?: number;
  MedicineTrayAvailable?: number;
  curtansAvailable?: number;
  TubelightWorking?: number;
  TubelightNotWorking?: number;
  CookingGasAvailable?: number;
  DietaryScaleAvailable?: number;
  MeasuringJarAvailable?: number;
  ElectricMixerBlendeAvailable?: number;
  WaterFilterROAvailable?: number;
  RefrigeratorAvailable?: number;
  UtensilforKitchenAvailable?: number;
  MassacringCupGlassSpoon?: number; // Matches DB typo
  PressercookerAvailable?: number; // Matches DB typo
  SteelCacontnerAvailable?: number; // Matches DB typo
}

// Bed Occupancy Interface
export interface BedOccupancyData {
  Rid?: number;
  MTCCode: string;
  BedSanctioned: number;
  UtilizedBed: number;
  RecordDate: string | Date;
  BedOccupency: number; // Matches DB Column spelling 'Occupency'
}

// ==========================================
// 2. DB CONFIGURATION
// ==========================================

const config: sql.config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  server: process.env.DB_SERVER!,
  port: parseInt(process.env.DB_PORT || '1433'),
  database: process.env.DB_NAME!,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// ==========================================
// 3. SINGLETON CONNECTION POOL
// ==========================================

let pool: sql.ConnectionPool | null = null;

export async function getDBConnection() {
  try {
    if (pool && pool.connected) {
      return pool;
    }
    pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error('❌ Database Connection Failed:', err);
    throw err;
  }
}

// ==========================================
// 4. HELPER UTILS
// ==========================================

// FIX: Explicitly typed 'val' to avoid implicit 'any'
const parseSafeInt = (val: string | number | null | undefined): number | null => {
  if (!val) return null;
  if (typeof val === 'number') return val;
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? null : parsed;
};

// ==========================================
// 5. FETCH FUNCTIONS (CORE DATA)
// ==========================================

export async function getChildrenFromDB() {
  try {
    const db = await getDBConnection();
    const result = await db.request().query(`
      SELECT
        SamNo, MTCCode, ChildName, MotherName, FatherName,
        MobileNumber, DateofBirth, AdmissionDate, AdmissionWeight,
        AdmissionHeight, DistrictId, BlockId, VillageName
      FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
      ORDER BY AdmissionDate DESC
    `);
    return result.recordset;
  } catch (err) {
    console.error('❌ Fetch Children Error:', err);
    throw err;
  }
}

export async function getDischargeList() {
  try {
    const db = await getDBConnection();
    // We filter by DischargeDate IS NULL to only show currently admitted children
    const query = `
      SELECT
        SamNo,
        MTCCode,
        ChildName,
        FatherName,
        MotherName,
        DateofBirth,
        AdmissionWeight,
        AdmissionHeight,
        AdmissionDate
      FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
      WHERE DischargeDate IS NULL
      ORDER BY AdmissionDate DESC
    `;
    const result = await db.request().query(query);
    return result.recordset as DischargeListChild[];
  } catch (err) {
    console.error('❌ Error fetching discharge list:', err);
    throw err;
  }
}

export async function getDailyWeights(samNo: string) {
  try {
    const db = await getDBConnection();
    const result = await db.request()
      .input('SamNo', sql.NVarChar, samNo)
      .query(`
        SELECT * FROM [MTCJharkhand].[dbo].[MTCSAMDailyWeight]
        WHERE SamNo = @SamNo
      `);

    return result.recordset[0] || null;
  } catch (err) {
    console.error('❌ Fetch Weight Error:', err);
    throw err;
  }
}

export async function getChildBySamNo(samNo: string) {
  try {
    const db = await getDBConnection();
    const result = await db.request()
      .input('SamNo', sql.NVarChar, samNo)
      .query(`
        SELECT TOP 1
          SamNo, MTCCode, ChildName, MotherName, FatherName,
          AdmissionWeight, AdmissionHeight, AdmissionMuac,
          AdmissionEdema, AdmissionDate, DateofBirth
        FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
        WHERE SamNo = @SamNo
      `);
    return result.recordset[0] || null;
  } catch (err) {
    console.error('❌ Error fetching child:', err);
    throw err;
  }
}

export async function getFollowUpData(samNo: string) {
  try {
    const db = await getDBConnection();
    const result = await db.request()
      .input('SamNo', sql.NVarChar, samNo)
      .query(`
        SELECT TOP 1 * FROM [MTCJharkhand].[dbo].[MTCFollowUp]
        WHERE SamNo = @SamNo
      `);
    return result.recordset[0] as FollowUpData || null;
  } catch (err) {
    console.error('❌ Error fetching FollowUp data:', err);
    throw err;
  }
}

export async function getEquipmentData(mtcCode: string) {
  try {
    const db = await getDBConnection();
    const result = await db.request()
      .input('MTCCode', sql.NVarChar, mtcCode)
      .query(`
        SELECT TOP 1 * FROM [MTCJharkhand].[dbo].[MTCEquipment]
        WHERE MTCCode = @MTCCode
      `);
    return result.recordset[0] as EquipmentData || null;
  } catch (err) {
    console.error('❌ Error fetching Equipment Data:', err);
    throw err;
  }
}

// Fetch Bed Occupancy (Latest)
export async function getBedOccupancy(mtcCode: string) {
  try {
    const db = await getDBConnection();
    const result = await db.request()
      .input('MTCCode', sql.NVarChar, mtcCode)
      .query(`
        SELECT TOP 1
          [MTCCode],
          [BedSanctioned],
          [UtilizedBed],
          [RecordDate],
          [BedOccupency]
        FROM [MTCJharkhand].[dbo].[MTCBedOccupency]
        WHERE MTCCode = @MTCCode
        ORDER BY RecordDate DESC
      `);
    return result.recordset[0] as BedOccupancyData || null;
  } catch (err) {
    console.error('❌ Error fetching Bed Occupancy:', err);
    throw err;
  }
}

// NEW: Fetch all Bed Occupancy records for a specific year (For the Table)
export async function getBedOccupancyHistory(mtcCode: string, year: number) {
  try {
    const db = await getDBConnection();
    const result = await db.request()
      .input('MTCCode', sql.NVarChar, mtcCode)
      .input('Year', sql.Int, year)
      .query(`
        SELECT
          [Rid] as id,
          [MTCCode],
          [BedSanctioned],
          [UtilizedBed],
          [RecordDate] as date,
          [BedOccupency] as bedOccupancyPercentage
        FROM [MTCJharkhand].[dbo].[MTCBedOccupency]
        WHERE MTCCode = @MTCCode
        AND YEAR(RecordDate) = @Year
        ORDER BY RecordDate ASC
      `);
    return result.recordset;
  } catch (err) {
    console.error('❌ Error fetching Bed Occupancy History:', err);
    throw err;
  }
}

// ==========================================
// 6. REFERENCE DATA FETCHERS (DROPDOWNS)
// ==========================================

export async function getGenderList() {
  try {
    const db = await getDBConnection();
    const result = await db.request().query(`SELECT [GenderId], [GenderName] FROM [MTCJharkhand].[dbo].[MTCGender]`);
    return result.recordset;
  } catch (err) { console.error('Error fetching Genders', err); throw err; }
}

export async function getCastList() {
  try {
    const db = await getDBConnection();
    const result = await db.request().query(`SELECT [CastId], [CastName] FROM [MTCJharkhand].[dbo].[MTCCasts]`);
    return result.recordset;
  } catch (err) { console.error('Error fetching Casts', err); throw err; }
}

export async function getDistrictList() {
  try {
    const db = await getDBConnection();
    const result = await db.request().query(`SELECT [DistrictId], [DistrictCode], [DistrictName] FROM [MTCJharkhand].[dbo].[MTCDistricts] ORDER BY [DistrictName] ASC`);
    return result.recordset;
  } catch (err) { console.error('Error fetching Districts', err); throw err; }
}

export async function getBlockList(districtId?: number | string) {
  try {
    const db = await getDBConnection();
    let query = `SELECT [BlockId], [BlockName], [DistrictId] FROM [MTCJharkhand].[dbo].[MTCBlock]`;
    const request = db.request();
    if (districtId) {
      query += ` WHERE [DistrictId] = @DistrictId`;
      request.input('DistrictId', sql.Int, districtId);
    }
    query += ` ORDER BY [BlockName] ASC`;
    const result = await request.query(query);
    return result.recordset;
  } catch (err) { console.error('Error fetching Block List', err); throw err; }
}

export async function getICDSList(districtId?: number | string) {
  try {
    const db = await getDBConnection();
    let query = `SELECT [ICDSId], [ICDSName], [DistrictId] FROM [MTCJharkhand].[dbo].[MTCIcds]`;
    const request = db.request();
    if (districtId) {
      query += ` WHERE [DistrictId] = @DistrictId`;
      request.input('DistrictId', sql.Int, districtId);
    }
    query += ` ORDER BY [ICDSName] ASC`;
    const result = await request.query(query);
    return result.recordset;
  } catch (err) { console.error('Error fetching ICDS List', err); throw err; }
}

export async function getAnganwadiList(icdsId?: number | string) {
  try {
    const db = await getDBConnection();
    let query = `SELECT [AnganwadiId], [AnganwadiName], [ICDSId] FROM [MTCJharkhand].[dbo].[MTCAnganwadi]`;
    const request = db.request();
    if (icdsId) {
      query += ` WHERE [ICDSId] = @ICDSId`;
      request.input('ICDSId', sql.Int, icdsId);
    }
    query += ` ORDER BY [AnganwadiName] ASC`;
    const result = await request.query(query);
    return result.recordset;
  } catch (err) { console.error('Error fetching Anganwadi List', err); throw err; }
}

// ==========================================
// 7. GENERATE NEXT SAM NUMBER
// ==========================================

export async function generateNextSamNumber() {
  try {
    const db = await getDBConnection();

    // 1. Fetch Dynamic Prefix
    const mtcResult = await db.request().query(`SELECT TOP 1 MTCCode FROM [MTCJharkhand].[dbo].[MTCCenter]`);
    let mtcPrefix = "JH/WSB/CBS";
    if (mtcResult.recordset.length > 0 && mtcResult.recordset[0].MTCCode) {
       mtcPrefix = mtcResult.recordset[0].MTCCode;
    }

    // 2. Find last record
    const searchPattern = `${mtcPrefix}/%`;
    const result = await db.request()
      .input('Pattern', sql.NVarChar, searchPattern)
      .query(`
        SELECT TOP 1 SamNo
        FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
        WHERE SamNo LIKE @Pattern
        ORDER BY LEN(SamNo) DESC, SamNo DESC
      `);

    const lastRecord = result.recordset[0];

    // 3. Generate Number
    if (!lastRecord || !lastRecord.SamNo) {
      return `${mtcPrefix}/1001`;
    }

    const parts = lastRecord.SamNo.split('/');
    const lastNumStr = parts[parts.length - 1];
    const lastNum = parseInt(lastNumStr, 10);

    if (isNaN(lastNum)) return `${mtcPrefix}/${Date.now().toString().slice(-4)}`;

    const nextNum = lastNum + 1;
    return `${mtcPrefix}/${nextNum}`;

  } catch (err) {
    console.error('❌ Error generating SAM No:', err);
    return `JH/ERROR/${Math.floor(Math.random() * 1000)}`;
  }
}

// ==========================================
// 8. INSERT / UPDATE FUNCTIONS
// ==========================================

export async function updateDailyWeight(samNo: string, mtcCode: string, day: number, weight: number) {
  try {
    if (day < 0 || day > 59) throw new Error("Day must be between 0 and 59");

    const db = await getDBConnection();
    const checkRow = await db.request()
      .input('SamNo', sql.NVarChar, samNo)
      .query(`SELECT count(*) as count FROM [MTCJharkhand].[dbo].[MTCSAMDailyWeight] WHERE SamNo = @SamNo`);

    const exists = checkRow.recordset[0].count > 0;
    const dayColumn = `Day${day}`;

    if (exists) {
      await db.request()
        .input('SamNo', sql.NVarChar, samNo)
        .input('Weight', sql.Decimal(5, 2), weight)
        .query(`UPDATE [MTCJharkhand].[dbo].[MTCSAMDailyWeight] SET ${dayColumn} = @Weight WHERE SamNo = @SamNo`);
    } else {
      await db.request()
        .input('SamNo', sql.NVarChar, samNo)
        .input('MTCCode', sql.NVarChar, mtcCode)
        .input('Weight', sql.Decimal(5, 2), weight)
        .query(`INSERT INTO [MTCJharkhand].[dbo].[MTCSAMDailyWeight] (SamNo, MTCCode, ${dayColumn}) VALUES (@SamNo, @MTCCode, @Weight)`);
    }
    return { success: true, message: `Updated ${dayColumn}` };
  } catch (err) { console.error(`Error updating weight:`, err); throw err; }
}

export async function registerChildInDB(childData: ChildData) {
  try {
    const db = await getDBConnection();

    // Fallback MTCCode logic
    let realMTCCode = childData.MTCCode;
    try {
        const mtcQuery = await db.request().query(`SELECT TOP 1 MTCCode FROM [MTCJharkhand].[dbo].[MTCCenter]`);
        if (mtcQuery.recordset.length > 0 && mtcQuery.recordset[0].MTCCode) {
            realMTCCode = mtcQuery.recordset[0].MTCCode;
        }
    } catch {
        // FIX: Removed the unused variable '_e' entirely
        console.warn("Using provided MTCCode as fallback.");
    }

    const transaction = new sql.Transaction(db);
    await transaction.begin();

    try {
      const request = new sql.Request(transaction);
      const queryChildren = `
        INSERT INTO [MTCJharkhand].[dbo].[MTCSAMChildren] (
          SamNo, MTCCode, AtId, RefererId, ChildName, MotherName, FatherName,
          MobileNumber, BPLNo, DateofBirth, GenderId, CastId, Address,
          DistrictId, BlockId, ICDSId, AnganwadiId, VillageName, AdmissionDate,
          AdmissionWeight, AdmissionHeight, AdmissionZScore, AdmissionEdema,
          AdmissionMuac, AdmissionAppetite, BreastFeeding, ComplementaryFeeding,
          MedicalComplication, RegistrationImage, DischargeDate, DischargeWeight,
          DischargeHeight, DischargeEdema, DischargeMuac, DischargeZScore,
          ExitIndicator, IFAToMotherTablet, MotherWages, IFAToMotherSyrup,
          DischargeStatus, DischargeImage, MedicalTrasfer
        )
        VALUES (
          @SamNo, @MTCCode, @AtId, @RefererId, @ChildName, @MotherName, @FatherName,
          @MobileNumber, @BPLNo, @DateofBirth, @GenderId, @CastId, @Address,
          @DistrictId, @BlockId, @ICDSId, @AnganwadiId, @VillageName, @AdmissionDate,
          @AdmissionWeight, @AdmissionHeight, @AdmissionZScore, @AdmissionEdema,
          @AdmissionMuac, @AdmissionAppetite, @BreastFeeding, @ComplementaryFeeding,
          @MedicalComplication, @RegistrationImage, NULL, NULL,
          NULL, NULL, NULL, NULL,
          NULL, NULL, NULL, NULL,
          NULL, NULL, NULL
        )
      `;

      request.input('SamNo', sql.NVarChar, childData.SamNo);
      request.input('MTCCode', sql.NVarChar, realMTCCode);
      request.input('AtId', sql.Int, childData.AtId);
      request.input('RefererId', sql.Int, childData.RefererId);
      request.input('ChildName', sql.NVarChar, childData.ChildName);
      request.input('MotherName', sql.NVarChar, childData.MotherName);
      request.input('FatherName', sql.NVarChar, childData.FatherName);
      request.input('MobileNumber', sql.NVarChar, childData.MobileNumber);
      request.input('BPLNo', sql.NVarChar, childData.BPLNo || null);
      request.input('DateofBirth', sql.Date, childData.DateofBirth);
      request.input('GenderId', sql.Int, childData.GenderId);
      request.input('CastId', sql.Int, childData.CastId);
      request.input('Address', sql.NVarChar, childData.Address);
      request.input('DistrictId', sql.Int, parseSafeInt(childData.DistrictId));
      request.input('BlockId', sql.Int, parseSafeInt(childData.BlockId));
      request.input('ICDSId', sql.Int, parseSafeInt(childData.ICDSId));
      request.input('AnganwadiId', sql.Int, parseSafeInt(childData.AnganwadiId));
      request.input('VillageName', sql.NVarChar, childData.VillageName);
      request.input('AdmissionDate', sql.DateTime, childData.AdmissionDate);
      request.input('AdmissionWeight', sql.Decimal(5,2), childData.AdmissionWeight);
      request.input('AdmissionHeight', sql.Decimal(5,2), childData.AdmissionHeight);
      request.input('AdmissionZScore', sql.Decimal(5,2), childData.AdmissionZScore);
      request.input('AdmissionEdema', sql.Int, childData.AdmissionEdema);
      request.input('AdmissionMuac', sql.Decimal(5,2), childData.AdmissionMuac);
      request.input('AdmissionAppetite', sql.Int, childData.AdmissionAppetite);
      request.input('BreastFeeding', sql.Int, childData.BreastFeeding);
      request.input('ComplementaryFeeding', sql.Int, childData.ComplementaryFeeding);
      request.input('MedicalComplication', sql.NVarChar, childData.MedicalComplication || null);
      request.input('RegistrationImage', sql.NVarChar(sql.MAX), childData.RegistrationImage || null);

      await request.query(queryChildren);

      const requestWeights = new sql.Request(transaction);
      requestWeights.input('SamNo', sql.NVarChar, childData.SamNo);
      requestWeights.input('MTCCode', sql.NVarChar, realMTCCode);
      requestWeights.input('Day0', sql.Decimal(5,2), childData.AdmissionWeight);
      await requestWeights.query(`INSERT INTO [MTCJharkhand].[dbo].[MTCSAMDailyWeight] (SamNo, MTCCode, Day0) VALUES (@SamNo, @MTCCode, @Day0)`);

      await transaction.commit();
      return { success: true };

    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  } catch (err) { console.error('❌ Insert Error:', err); throw err; }
}

export async function updateDischargeChild(data: DischargeData) {
  try {
    const db = await getDBConnection();
    const isMedicalTransfer = data.ExitIndicator === 3 ? 1 : 0;
    const dischargeStatus = 1;

    const query = `
      UPDATE [MTCJharkhand].[dbo].[MTCSAMChildren]
      SET
        DischargeDate = @DischargeDate,
        DischargeWeight = @DischargeWeight,
        DischargeHeight = @DischargeHeight,
        DischargeEdema = @DischargeEdema,
        DischargeMuac = @DischargeMuac,
        ExitIndicator = @ExitIndicator,
        IFAToMotherTablet = @IFAToMotherTablet,
        MotherWages = @MotherWages,
        IFAToMotherSyrup = @IFAToMotherSyrup,
        DischargeImage = @DischargeImage,
        MedicalTrasfer = @MedicalTrasfer,
        DischargeStatus = @DischargeStatus
      WHERE SamNo = @SamNo
    `;

    const request = db.request();

    request.input('SamNo', sql.NVarChar, data.SamNo);
    request.input('DischargeDate', sql.Date, new Date(data.DischargeDate));
    request.input('DischargeWeight', sql.Decimal(5, 2), data.DischargeWeight);
    request.input('DischargeHeight', sql.Decimal(5, 2), data.DischargeHeight);
    request.input('DischargeMuac', sql.Decimal(5, 2), data.DischargeMuac);
    request.input('DischargeEdema', sql.Int, data.DischargeEdema);
    request.input('ExitIndicator', sql.Int, data.ExitIndicator);
    request.input('IFAToMotherTablet', sql.Int, data.IFAToMotherTablet);
    request.input('MotherWages', sql.Int, data.MotherWages);
    request.input('IFAToMotherSyrup', sql.Int, data.IFAToMotherSyrup);
    request.input('DischargeImage', sql.NVarChar(sql.MAX), data.DischargeImage ?? null);
    request.input('MedicalTrasfer', sql.Int, isMedicalTransfer);
    request.input('DischargeStatus', sql.Int, dischargeStatus);

    await request.query(query);
    return { success: true };

  } catch (err) {
    console.error('❌ Error updating discharge record:', err);
    throw err;
  }
}

export async function saveFollowUpData(data: FollowUpData) {
  try {
    const db = await getDBConnection();

    const checkRecord = await db.request()
      .input('SamNo', sql.NVarChar, data.SamNo)
      .query(`SELECT COUNT(*) as count FROM [MTCJharkhand].[dbo].[MTCFollowUp] WHERE SamNo = @SamNo`);

    const exists = checkRecord.recordset[0].count > 0;
    const request = db.request();

    request.input('SamNo', sql.NVarChar, data.SamNo);
    request.input('MTCCode', sql.NVarChar, data.MTCCode || null);
    request.input('MotherName', sql.NVarChar, data.MotherName || null);
    request.input('DischargeDate', sql.Date, data.DischargeDate ? new Date(data.DischargeDate) : null);

    // FIX: Double cast (unknown -> Record) to resolve TS2352
    const bindFollowUpInputs = (prefix: string, source: FollowUpData) => {
      const dbPrefix = prefix === "Fourth" ? "Fourt" : prefix;
      // Cast to unknown first to allow the Record cast
      const safeSource = source as unknown as Record<string, string | number | Date | null | undefined>;

      request.input(`${prefix}FollowUpDate`, sql.Date, safeSource[`${prefix}FollowUpDate`] ? new Date(safeSource[`${prefix}FollowUpDate`] as string | Date) : null);
      request.input(`${dbPrefix}FollowUpDoneOn`, sql.Date, safeSource[`${dbPrefix}FollowUpDoneOn`] ? new Date(safeSource[`${dbPrefix}FollowUpDoneOn`] as string | Date) : null);
      request.input(`${dbPrefix}FollowUpWeight`, sql.Decimal(5, 2), safeSource[`${dbPrefix}FollowUpWeight`] || null);
      request.input(`${dbPrefix}FollowUpHeight`, sql.Decimal(5, 2), safeSource[`${dbPrefix}FollowUpHeight`] || null);
      request.input(`${dbPrefix}FollowUpMUAC`, sql.Decimal(5, 2), safeSource[`${dbPrefix}FollowUpMUAC`] || null);
      request.input(`${dbPrefix}FollowUpZscore`, sql.Decimal(5, 2), safeSource[`${dbPrefix}FollowUpZscore`] || null);
      request.input(`${dbPrefix}FollowUpMotherBP`, sql.NVarChar, safeSource[`${dbPrefix}FollowUpMotherBP`] || null);
      request.input(`${dbPrefix}FollowUpMotherWeight`, sql.Decimal(5, 2), safeSource[`${dbPrefix}FollowUpMotherWeight`] || null);
      request.input(`${dbPrefix}FollowUpMotherHB`, sql.Decimal(5, 2), safeSource[`${dbPrefix}FollowUpMotherHB`] || null);
    };

    bindFollowUpInputs('First', data);
    bindFollowUpInputs('Second', data);
    bindFollowUpInputs('Third', data);

    // Fourth manual binding
    request.input('FourthFollowUpDate', sql.Date, data.FourthFollowUpDate ? new Date(data.FourthFollowUpDate) : null);
    request.input('FourtFollowUpDoneOn', sql.Date, data.FourtFollowUpDoneOn ? new Date(data.FourtFollowUpDoneOn) : null);
    request.input('FourtFollowUpWeight', sql.Decimal(5, 2), data.FourtFollowUpWeight || null);
    request.input('FourtFollowUpHeight', sql.Decimal(5, 2), data.FourtFollowUpHeight || null);
    request.input('FourtFollowUpMUAC', sql.Decimal(5, 2), data.FourtFollowUpMUAC || null);
    request.input('FourtFollowUpZscore', sql.Decimal(5, 2), data.FourtFollowUpZscore || null);
    request.input('FourtFollowUpMotherBP', sql.NVarChar, data.FourtFollowUpMotherBP || null);
    request.input('FourtFollowUpMotherWeight', sql.Decimal(5, 2), data.FourtFollowUpMotherWeight || null);
    request.input('FourtFollowUpMotherHB', sql.Decimal(5, 2), data.FourtFollowUpMotherHB || null);

    let query = '';

    if (exists) {
      query = `
        UPDATE [MTCJharkhand].[dbo].[MTCFollowUp]
        SET
          MTCCode = @MTCCode, MotherName = @MotherName, DischargeDate = @DischargeDate,
          FirstFollowUpDate = @FirstFollowUpDate, FirstFollowUpDoneOn = @FirstFollowUpDoneOn, FirstFollowUpWeight = @FirstFollowUpWeight, FirstFollowUpHeight = @FirstFollowUpHeight, FirstFollowUpMUAC = @FirstFollowUpMUAC, FirstFollowUpZscore = @FirstFollowUpZscore, FirstFollowUpMotherBP = @FirstFollowUpMotherBP, FirstFollowUpMotherWeight = @FirstFollowUpMotherWeight, FirstFollowUpMotherHB = @FirstFollowUpMotherHB,
          SecondFollowUpDate = @SecondFollowUpDate, SecondFollowUpDoneOn = @SecondFollowUpDoneOn, SecondFollowUpWeight = @SecondFollowUpWeight, SecondFollowUpHeight = @SecondFollowUpHeight, SecondFollowUpMUAC = @SecondFollowUpMUAC, SecondFollowUpZscore = @SecondFollowUpZscore, SecondFollowUpMotherBP = @SecondFollowUpMotherBP, SecondFollowUpMotherWeight = @SecondFollowUpMotherWeight, SecondFollowUpMotherHB = @SecondFollowUpMotherHB,
          ThirdFollowUpDate = @ThirdFollowUpDate, ThirdFollowUpDoneOn = @ThirdFollowUpDoneOn, ThirdFollowUpWeight = @ThirdFollowUpWeight, ThirdFollowUpHeight = @ThirdFollowUpHeight, ThirdFollowUpMUAC = @ThirdFollowUpMUAC, ThirdFollowUpZscore = @ThirdFollowUpZscore, ThirdFollowUpMotherBP = @ThirdFollowUpMotherBP, ThirdFollowUpMotherWeight = @ThirdFollowUpMotherWeight, ThirdFollowUpMotherHB = @ThirdFollowUpMotherHB,
          FourthFollowUpDate = @FourthFollowUpDate, FourtFollowUpDoneOn = @FourtFollowUpDoneOn, FourtFollowUpWeight = @FourtFollowUpWeight, FourtFollowUpHeight = @FourtFollowUpHeight, FourtFollowUpMUAC = @FourtFollowUpMUAC, FourtFollowUpZscore = @FourtFollowUpZscore, FourtFollowUpMotherBP = @FourtFollowUpMotherBP, FourtFollowUpMotherWeight = @FourtFollowUpMotherWeight, FourtFollowUpMotherHB = @FourtFollowUpMotherHB
        WHERE SamNo = @SamNo
      `;
    } else {
      query = `
        INSERT INTO [MTCJharkhand].[dbo].[MTCFollowUp] (
          SamNo, MTCCode, MotherName, DischargeDate,
          FirstFollowUpDate, FirstFollowUpDoneOn, FirstFollowUpWeight, FirstFollowUpHeight, FirstFollowUpMUAC, FirstFollowUpZscore, FirstFollowUpMotherBP, FirstFollowUpMotherWeight, FirstFollowUpMotherHB,
          SecondFollowUpDate, SecondFollowUpDoneOn, SecondFollowUpWeight, SecondFollowUpHeight, SecondFollowUpMUAC, SecondFollowUpZscore, SecondFollowUpMotherBP, SecondFollowUpMotherWeight, SecondFollowUpMotherHB,
          ThirdFollowUpDate, ThirdFollowUpDoneOn, ThirdFollowUpWeight, ThirdFollowUpHeight, ThirdFollowUpMUAC, ThirdFollowUpZscore, ThirdFollowUpMotherBP, ThirdFollowUpMotherWeight, ThirdFollowUpMotherHB,
          FourthFollowUpDate, FourtFollowUpDoneOn, FourtFollowUpWeight, FourtFollowUpHeight, FourtFollowUpMUAC, FourtFollowUpZscore, FourtFollowUpMotherBP, FourtFollowUpMotherWeight, FourtFollowUpMotherHB
        ) VALUES (
          @SamNo, @MTCCode, @MotherName, @DischargeDate,
          @FirstFollowUpDate, @FirstFollowUpDoneOn, @FirstFollowUpWeight, @FirstFollowUpHeight, @FirstFollowUpMUAC, @FirstFollowUpZscore, @FirstFollowUpMotherBP, @FirstFollowUpMotherWeight, @FirstFollowUpMotherHB,
          @SecondFollowUpDate, @SecondFollowUpDoneOn, @SecondFollowUpWeight, @SecondFollowUpHeight, @SecondFollowUpMUAC, @SecondFollowUpZscore, @SecondFollowUpMotherBP, @SecondFollowUpMotherWeight, @SecondFollowUpMotherHB,
          @ThirdFollowUpDate, @ThirdFollowUpDoneOn, @ThirdFollowUpWeight, @ThirdFollowUpHeight, @ThirdFollowUpMUAC, @ThirdFollowUpZscore, @ThirdFollowUpMotherBP, @ThirdFollowUpMotherWeight, @ThirdFollowUpMotherHB,
          @FourthFollowUpDate, @FourtFollowUpDoneOn, @FourtFollowUpWeight, @FourtFollowUpHeight, @FourtFollowUpMUAC, @FourtFollowUpZscore, @FourtFollowUpMotherBP, @FourtFollowUpMotherWeight, @FourtFollowUpMotherHB
        )
      `;
    }

    await request.query(query);
    return { success: true, message: exists ? 'FollowUp Updated' : 'FollowUp Created' };

  } catch (err) {
    console.error('❌ Error saving FollowUp data:', err);
    throw err;
  }
}

export async function saveEquipmentData(data: EquipmentData) {
  try {
    const db = await getDBConnection();

    // Check if record exists
    const checkRecord = await db.request()
      .input('MTCCode', sql.NVarChar, data.MTCCode)
      .query(`SELECT COUNT(*) as count FROM [MTCJharkhand].[dbo].[MTCEquipment] WHERE MTCCode = @MTCCode`);

    const exists = checkRecord.recordset[0].count > 0;
    const request = db.request();

    // 1. Basic Inputs
    request.input('MTCCode', sql.NVarChar, data.MTCCode);
    request.input('LastUpdated', sql.DateTime, new Date());

    // 2. List of all equipment columns (Matches SQL spelling)
    // Typed this array as (keyof EquipmentData)[] to allow direct index access without 'any'
    const equipmentCols: (keyof EquipmentData)[] = [
      "DigitalWeighingScaleWorking", "DigitalWeighingScaleNotworking", "StadiometerWorking", "StadiometerNotWorking",
      "InfantometerWroking", "InfantometerNotWroking", "MUACTapeAvailable", "WeingScalesWorking", "WeingScalesNotworking",
      "ClockWorking", "ClockNotWorking", "CalculatorWorking", "CalculatorNotWorking", "SAMChartAvailable",
      "SAMRegisterAvailable", "CameraWorking", "CameraNotWorking", "FileAvailable", "AlmiraRakeAvailable",
      "AlmiraAvailable", "ProtocolPosterAvailable", "MarkerAvailable", "WhiteBoardAvailable", "DisplayBoardAvailable",
      "TabWorking", "TabNotWorking", "ThermometersWorking", "ThermometersNotWorking", "ResuscitationEquipmentAval",
      "NGTube6/8Available", "SuctionEquipmentWorking", "SuctionEquipmentNotWorking", "BloodTransfusionKitAval",
      "HbMeterWorking", "HbMeterNotWorking", "GlucometerWorking", "GlucometerNotWorking", "BedWorking", "BedNotWorking",
      "SideTableWorking", "SideTableNotWorking", "IVStandWorking", "IVStandNotWorking", "RoomHeaterWorking",
      "RoomHeaterNotWorking", "CoolerACWorking", "CoolerACNotWorking", "FanWorking", "FanNotWorking",
      "TabaleChairWorking", "TabaleChairNotWorking", "DustbinAvailable", "ShoeRackAvailable", "TVWardandPlayArea",
      "InverterWorking", "InverterNotWorking", "ToysAvailable", "NutritionCousellingFlipBooks", "WashingMachineWorking",
      "WashingMachineNotWorking", "GeyserWorking", "GeyserNotWorking", "ComputerWorking", "ComputerNotWorking",
      "PrinterWorking", "PrinterNotWorking", "BedSeatAvailable", "MedicineTrayAvailable", "curtansAvailable",
      "TubelightWorking", "TubelightNotWorking", "CookingGasAvailable", "DietaryScaleAvailable", "MeasuringJarAvailable",
      "ElectricMixerBlendeAvailable", "WaterFilterROAvailable", "RefrigeratorAvailable", "UtensilforKitchenAvailable",
      "MassacringCupGlassSpoon", "PressercookerAvailable", "SteelCacontnerAvailable"
    ];

    // 3. Bind Inputs dynamically (stripping bad chars for @params)
    equipmentCols.forEach(col => {
      const paramName = col.replace(/[^a-zA-Z0-9]/g, '');
      // TypeScript now knows 'col' is a valid key, so no casting or 'any' needed here
      const value = data[col] !== undefined ? data[col] : 0;
      request.input(paramName, sql.Int, value);
    });

    let query = '';

    if (exists) {
      // Generate UPDATE string
      const updateSet = equipmentCols.map(col => {
        const paramName = col.replace(/[^a-zA-Z0-9]/g, '');
        return `[${col}] = @${paramName}`;
      }).join(', ');

      query = `
        UPDATE [MTCJharkhand].[dbo].[MTCEquipment]
        SET LastUpdated = @LastUpdated, ${updateSet}
        WHERE MTCCode = @MTCCode
      `;
    } else {
      // Generate INSERT string
      const cols = equipmentCols.map(c => `[${c}]`).join(', ');
      const vals = equipmentCols.map(c => `@${c.replace(/[^a-zA-Z0-9]/g, '')}`).join(', ');

      query = `
        INSERT INTO [MTCJharkhand].[dbo].[MTCEquipment]
        (MTCCode, LastUpdated, ${cols})
        VALUES (@MTCCode, @LastUpdated, ${vals})
      `;
    }

    await request.query(query);
    return { success: true, message: exists ? 'Equipment Updated' : 'Equipment Added' };

  } catch (err) {
    console.error('❌ Error saving Equipment data:', err);
    throw err;
  }
}

// Save Bed Occupancy
export async function saveBedOccupancy(data: BedOccupancyData) {
  try {
    const db = await getDBConnection();
    const request = db.request();

    // 1. Bind Inputs
    request.input('MTCCode', sql.NVarChar, data.MTCCode);
    request.input('BedSanctioned', sql.Int, data.BedSanctioned);
    request.input('UtilizedBed', sql.Int, data.UtilizedBed);
    request.input('RecordDate', sql.DateTime, new Date(data.RecordDate));
    request.input('BedOccupency', sql.Decimal(5, 2), data.BedOccupency);

    // 2. Check if record exists for this Date AND MTCCode
    const checkQuery = `
      SELECT COUNT(*) as count
      FROM [MTCJharkhand].[dbo].[MTCBedOccupency]
      WHERE MTCCode = @MTCCode
      AND CAST(RecordDate AS DATE) = CAST(@RecordDate AS DATE)
    `;

    const checkResult = await db.request()
      .input('MTCCode', sql.NVarChar, data.MTCCode)
      .input('RecordDate', sql.DateTime, new Date(data.RecordDate))
      .query(checkQuery);

    const exists = checkResult.recordset[0].count > 0;

    let query = '';

    if (exists) {
      // UPDATE existing record
      query = `
        UPDATE [MTCJharkhand].[dbo].[MTCBedOccupency]
        SET
          BedSanctioned = @BedSanctioned,
          UtilizedBed = @UtilizedBed,
          BedOccupency = @BedOccupency,
          RecordDate = @RecordDate
        WHERE MTCCode = @MTCCode
        AND CAST(RecordDate AS DATE) = CAST(@RecordDate AS DATE)
      `;
    } else {
      // INSERT new record
      query = `
        INSERT INTO [MTCJharkhand].[dbo].[MTCBedOccupency]
        (MTCCode, BedSanctioned, UtilizedBed, RecordDate, BedOccupency)
        VALUES
        (@MTCCode, @BedSanctioned, @UtilizedBed, @RecordDate, @BedOccupency)
      `;
    }

    await request.query(query);
    return { success: true, message: exists ? 'Bed Occupancy Updated' : 'Bed Occupancy Added' };

  } catch (err) {
    console.error('❌ Error saving Bed Occupancy:', err);
    throw err;
  }
}