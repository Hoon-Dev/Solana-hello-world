use solana_program::{
  entrypoint,
  entrypoint::ProgramResult,
  pubkey::Pubkey,
  account_info::AccountInfo,
  msg
};

entrypoint!(instruction_process);

pub fn instruction_process(
  _program_id: &Pubkey,
  _accounts: &[AccountInfo],
  _instruction_data: &[u8]
) -> ProgramResult {
  msg!("Hello world !");
  Ok(())
}