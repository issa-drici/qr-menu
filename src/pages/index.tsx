import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/database.types'


export default function Home() {
	return (
		<div className='bg-white w-full h-full min-h-screen'>
			<div className="flex w-full h-full mt-36 justify-center items-center ">
				<h2 className='text-3xl font-bold'>Bienvenue chez zynk !</h2>
			</div>
		</div>
	);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	// Create authenticated Supabase Client
	const supabaseServerClient = createServerSupabaseClient<Database>(ctx);

	// Check if we have a session
	const {
		data: { session },
	} = await supabaseServerClient.auth.getSession();

	const { data: lessons } = await supabaseServerClient.from("lesson").select("*");

	if (!session) {
		return {
			props: {
				lessons,
			},
		}
	}

	return {
		props: {
			lessons,
			initialSession: session,
			user: session.user,
		},
	};
};