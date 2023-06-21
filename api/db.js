const {createClient} = require('@supabase/supabase-js');

const supabase = createClient('http://localhost:54323', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0')


const tableName = 'countries'
const table = supabase.from(tableName);

async function getAllTableNames() {
  try {
    const {data, error} = await supabase.rpc('get_all_table_names');
    if (error) {
      throw error;
    }
    console.log(data);
  } catch (error) {
    console.error('Error retrieving table names:', error.message);
  }
}

getAllTableNames();
